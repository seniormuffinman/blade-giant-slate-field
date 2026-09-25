import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Bell, Download, Info, MapPin, ParkingCircle, Settings as SettingsIcon } from "lucide-react";
import { ParkingDisc } from "@/components/parking-disc";
import { Sheet } from "@/components/sheet";
import {
  CANTON_NAMES,
  CANTON_ORDER,
  DAYS,
  DEFAULT_SETTINGS,
  VERSION,
  type Holiday,
  type Session,
  type Settings,
} from "@/lib/blue-zone/constants";
import { nearestCanton } from "@/lib/blue-zone/geo";
import { fetchHolidays } from "@/lib/blue-zone/holidays";
import { computeRules } from "@/lib/blue-zone/rules";
import {
  loadHolidays,
  loadNotified,
  loadSession,
  loadSettings,
  saveHolidays,
  saveNotified,
  saveSession,
  saveSettings,
} from "@/lib/blue-zone/storage";
import { dateKey, formatClock, formatRemaining } from "@/lib/blue-zone/time";
import { cn } from "@/lib/cn";

type SheetId = "disc" | "rules" | "settings" | null;

export function BlueZoneApp() {
  const [now, setNow] = useState(() => new Date());
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [locLabel, setLocLabel] = useState("Zürich");
  const [sheet, setSheet] = useState<SheetId>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [holidayMeta, setHolidayMeta] = useState("Holidays: —");
  const [notified, setNotified] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = loadSettings();
    setSettings(s);
    setHolidays(loadHolidays(s.canton));
    setSession(loadSession());
    setNotified(loadNotified());
    setLocLabel(CANTON_NAMES[s.canton] ?? s.canton);
    setReady(true);
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const persist = useCallback((next: Settings) => {
    setSettings(next);
    saveSettings(next);
  }, []);

  const loadHolidayData = useCallback(async (canton: string) => {
    try {
      const list = await fetchHolidays(canton);
      setHolidays(list);
      saveHolidays(canton, list);
      setHolidayMeta(`Holidays loaded for CH-${canton} · OpenHolidays API`);
    } catch {
      setHolidayMeta("Holiday data offline — use toggle if needed");
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    void loadHolidayData(settings.canton);
  }, [ready, settings.canton, loadHolidayData]);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  useEffect(() => {
    if (!ready || !settings.autoLoc || !navigator.geolocation) return;
    setLocLabel("Locating…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const code = nearestCanton(pos.coords.latitude, pos.coords.longitude);
        setLocLabel(CANTON_NAMES[code] ?? code);
        if (code !== settings.canton) {
          persist({ ...settings, canton: code });
        }
      },
      () => {
        setLocLabel(`${CANTON_NAMES[settings.canton] ?? settings.canton} · GPS off`);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }, [ready, settings.autoLoc]); // eslint-disable-line react-hooks/exhaustive-deps

  const holidayToday = useMemo(() => {
    if (settings.forceHoliday) return { yes: true, name: "Public holiday (manual)" };
    const key = dateKey(now);
    const found = holidays.find((h) => h.date === key);
    return found ? { yes: true, name: found.name } : { yes: false, name: "" };
  }, [holidays, now, settings.forceHoliday]);

  const isSunday = now.getDay() === 0;
  const rules = useMemo(
    () => computeRules(now, holidayToday.yes, holidayToday.name),
    [now, holidayToday],
  );

  const showHolidayChip = holidayToday.yes || isSunday;
  const holidayChipLabel = holidayToday.yes ? holidayToday.name : "Sunday";

  useEffect(() => {
    if (!session) return;
    const left = session.leaveByMs - Date.now();
    if (
      settings.notifyOn &&
      !notified &&
      left > 0 &&
      left <= settings.notifyMins * 60 * 1000
    ) {
      sendNotification(
        `Blue Zone — ${formatRemaining(left)} left`,
        `Leave by ${session.leaveLabel}. Move your vehicle soon.`,
      );
      setNotified(true);
      saveNotified(true);
    }
  }, [now, session, settings.notifyOn, settings.notifyMins, notified]);

  function flash(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  }

  function startPark() {
    if (rules.free && !rules.leaveBy) {
      flash("No time limit right now — no timer needed");
      return;
    }
    if (!rules.leaveBy) {
      flash("Cannot start timer — check local signs");
      return;
    }
    const leave = new Date(now);
    const [hh, mm] = rules.leaveBy.split(":").map(Number);
    leave.setSeconds(0, 0);
    leave.setHours(hh, mm, 0, 0);
    if (leave.getTime() <= now.getTime()) leave.setDate(leave.getDate() + 1);

    const next: Session = {
      startMs: now.getTime(),
      leaveByMs: leave.getTime(),
      discLabel: rules.disc ?? "—",
      leaveLabel: rules.leaveBy,
    };
    setSession(next);
    saveSession(next);
    setNotified(false);
    saveNotified(false);
    if (settings.notifyOn && "Notification" in window && Notification.permission === "default") {
      void Notification.requestPermission();
    }
    flash(`Parking started · leave by ${rules.leaveBy}`);
  }

  function endPark() {
    setSession(null);
    saveSession(null);
    setNotified(false);
    flash("Parking ended");
  }

  const remaining = session ? session.leaveByMs - now.getTime() : 0;
  const timerTone =
    remaining <= 0 || remaining <= 5 * 60 * 1000
      ? "danger"
      : remaining <= settings.notifyMins * 60 * 1000
        ? "warn"
        : "accent";

  const toneBar =
    rules.tone === "ok"
      ? "bg-ok"
      : rules.tone === "warn"
        ? "bg-warn"
        : rules.tone === "accent"
          ? "bg-primary-bright"
          : "bg-muted";

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))]">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-[10px] bg-linear-to-br from-primary-bright to-primary text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(37,99,235,0.4)]">
            BZ
          </div>
          <div>
            <div className="text-base font-semibold tracking-tight text-fg">Blue Zone</div>
            <div className="text-[11px] font-medium text-muted">v{VERSION}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <IconBtn label="Rules" onClick={() => setSheet("rules")}>
            <Info className="size-5" />
          </IconBtn>
          <IconBtn label="Settings" onClick={() => setSheet("settings")}>
            <SettingsIcon className="size-5" />
          </IconBtn>
        </div>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Chip>
          <strong className="text-fg tabular-nums">{formatClock(now)}</strong>
          <span>{DAYS[now.getDay()]}</span>
        </Chip>
        <Chip>
          <MapPin className="size-3" />
          <span>{locLabel}</span>
        </Chip>
        {showHolidayChip && (
          <Chip holiday>
            <strong>{holidayChipLabel}</strong>
          </Chip>
        )}
      </div>

      <section className="relative mb-3.5 overflow-hidden rounded-[18px] border border-border bg-surface px-5 py-5">
        <div className={cn("absolute inset-x-0 top-0 h-1", toneBar)} />
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-muted">
          Status
        </div>
        <h1 className="mb-1 text-2xl font-bold tracking-tight text-fg">{rules.title}</h1>
        <p className="text-[13px] text-muted">{rules.sub}</p>
      </section>

      <div className="mb-3.5 grid grid-cols-2 gap-2.5">
        <div className="rounded-[14px] border border-border bg-surface p-3.5">
          <div className="mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-muted">
            Set disc to
            <button
              type="button"
              onClick={() => setSheet("disc")}
              className="grid size-6 place-items-center rounded-full border border-border bg-surface-2 text-[11px] font-bold text-muted"
              aria-label="How to set the disc"
            >
              i
            </button>
          </div>
          <div className="flex items-center gap-2">
            <ParkingDisc timeLabel={rules.disc} animate={false} size="tile" />
            <div>
              <div className="text-[22px] font-bold tracking-tight text-fg tabular-nums">
                {rules.disc ?? "—"}
              </div>
              <div className="text-[11px] text-muted">
                {rules.disc ? "Next half-hour" : "Not required"}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[14px] border border-border bg-surface p-3.5">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
            Leave by
          </div>
          <div className="text-[22px] font-bold tracking-tight text-fg tabular-nums">
            {rules.leaveBy ?? "—"}
          </div>
          <div className="text-[11px] text-muted">{rules.leaveBy ? "Must be gone by" : "—"}</div>
        </div>
      </div>

      {session && (
        <div className="mb-3.5 rounded-[18px] border border-primary-bright/35 bg-linear-to-b from-[#152038] to-surface px-4 py-4 text-center">
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
            Time remaining
          </div>
          <div
            className={cn(
              "text-[40px] font-bold leading-none tracking-tight tabular-nums",
              timerTone === "danger"
                ? "text-danger"
                : timerTone === "warn"
                  ? "text-warn"
                  : "text-primary-bright",
            )}
          >
            {remaining <= 0 ? "00:00" : formatRemaining(remaining)}
          </div>
          <p className="mt-1.5 text-xs text-muted">
            {remaining <= 0
              ? "Time expired · move the vehicle"
              : `Leave by ${session.leaveLabel} · disc ${session.discLabel}`}
          </p>
          <button
            type="button"
            onClick={endPark}
            className="mt-3.5 rounded-[10px] border border-danger/30 bg-danger/15 px-3.5 py-2.5 text-[13px] font-semibold text-danger"
          >
            End parking
          </button>
        </div>
      )}

      {!session && (
        <button
          type="button"
          onClick={startPark}
          disabled={rules.free && !rules.leaveBy}
          className="mb-4 flex items-center justify-center gap-2 rounded-[14px] bg-linear-to-br from-primary-bright to-primary px-4 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_20px_rgba(37,99,235,0.35)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          <ParkingCircle className="size-5" />
          Park now
        </button>
      )}

      <p className="mt-auto pt-3 text-center text-[11px] text-muted/70">
        Follow local signs · Signaling Ordinance 1979
      </p>

      <Sheet open={sheet === "disc"} title="Set your disc" onClose={() => setSheet(null)}>
        <div className="flex flex-col items-center gap-4 py-2">
          <ParkingDisc timeLabel={rules.disc} animate={sheet === "disc"} size="hero" />
          <p className="max-w-[280px] text-center text-[13px] leading-relaxed text-muted">
            Set the wheel to the <strong className="font-medium text-fg">next half-hour mark after</strong> you
            arrive.
            <br />
            Example: arrive <strong className="font-medium text-fg">9:05</strong> → set{" "}
            <strong className="font-medium text-fg">9:30</strong> → leave by{" "}
            <strong className="font-medium text-fg">10:30</strong>.
          </p>
        </div>
      </Sheet>

      <Sheet open={sheet === "rules"} title="Rules" onClose={() => setSheet(null)}>
        <div className="space-y-3 text-[13px] leading-relaxed text-muted">
          <h3 className="text-[13px] font-semibold text-fg">Time limits (Mon–Sat)</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>08:00–11:30 & 13:30–18:00 → max <strong className="font-medium text-fg">1 hour</strong></li>
            <li>Arrival 11:30–13:30 → valid until <strong className="font-medium text-fg">14:30</strong></li>
            <li>Arrival 18:00–08:00 → valid until <strong className="font-medium text-fg">09:00</strong></li>
          </ul>
          <h3 className="text-[13px] font-semibold text-fg">Sundays & public holidays</h3>
          <p>No time limit unless an extra sign says otherwise.</p>
          <h3 className="text-[13px] font-semibold text-fg">Setting the disc</h3>
          <p>
            Set the wheel to the <strong className="font-medium text-fg">next time-line after</strong> arrival.
            Electronic discs are not permitted. Disc must be clearly visible and upright.
          </p>
          <h3 className="text-[13px] font-semibold text-fg">No disc needed</h3>
          <p>19:00–07:59 if you rejoin traffic before 08:00.</p>
          <h3 className="text-[13px] font-semibold text-fg">Invalid if</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>Slanted or not fully visible</li>
            <li>Arrival time set incorrectly</li>
            <li>Max parking time exceeded</li>
            <li>Time re-adjusted without rejoining traffic</li>
          </ul>
          <h3 className="text-[13px] font-semibold text-fg">Where to get a disc</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>Transport Service licensing office — Mühlegasse 18</li>
            <li>Zurich City Police guards</li>
            <li>Specialist retailers</li>
          </ul>
          <p className="pt-2 text-[11px] opacity-70">
            Legal basis: Signaling Ordinance of 5 September 1979. Always follow local signs.
          </p>
        </div>
      </Sheet>

      <Sheet open={sheet === "settings"} title="Settings" onClose={() => setSheet(null)}>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
          Canton
        </label>
        <select
          value={settings.canton}
          onChange={(e) => {
            const canton = e.target.value;
            persist({ ...settings, canton });
            setLocLabel(CANTON_NAMES[canton] ?? canton);
          }}
          className="mb-4 w-full rounded-xl border border-border bg-surface-2 px-3.5 py-3 text-[15px] font-medium text-fg outline-none"
        >
          {CANTON_ORDER.map((code) => (
            <option key={code} value={code}>
              {CANTON_NAMES[code]}
            </option>
          ))}
        </select>

        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
          Notify before expiry (minutes)
        </label>
        <input
          type="number"
          min={1}
          max={60}
          value={settings.notifyMins}
          onChange={(e) =>
            persist({
              ...settings,
              notifyMins: Math.min(60, Math.max(1, Number(e.target.value) || 10)),
            })
          }
          className="mb-3 w-full rounded-xl border border-border bg-surface-2 px-3.5 py-3 text-[15px] font-medium text-fg outline-none"
        />

        <Toggle
          label="Enable notifications"
          checked={settings.notifyOn}
          onChange={(v) => {
            persist({ ...settings, notifyOn: v });
            if (v && "Notification" in window && Notification.permission === "default") {
              void Notification.requestPermission();
            }
          }}
        />
        <Toggle
          label="Treat as public holiday"
          checked={settings.forceHoliday}
          onChange={(v) => persist({ ...settings, forceHoliday: v })}
        />
        <Toggle
          label="Auto-detect location"
          checked={settings.autoLoc}
          onChange={(v) => persist({ ...settings, autoLoc: v })}
        />

        <a
          href="/blue-zone-parking.zip"
          download="blue-zone-parking.zip"
          className="mt-5 flex items-center justify-center gap-2 rounded-[14px] border border-border bg-surface-2 px-4 py-3 text-sm font-semibold text-fg"
        >
          <Download className="size-4" />
          Download app folder (.zip)
        </a>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
          <Bell className="size-3.5" />
          {holidayMeta}
        </p>
      </Sheet>

      <div
        className={cn(
          "bz-toast pointer-events-none fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 max-w-[90%] -translate-x-1/2 rounded-xl border border-border bg-surface-2 px-5 py-3 text-center text-[13px] font-medium text-fg shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition",
          toast ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
        )}
        role="status"
      >
        {toast}
      </div>
    </div>
  );
}

function Chip({
  children,
  holiday,
}: {
  children: ReactNode;
  holiday?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium tabular-nums",
        holiday
          ? "border-ok/30 bg-ok/15 text-ok"
          : "border-border bg-surface text-muted",
      )}
    >
      {children}
    </span>
  );
}

function IconBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-xl border border-border bg-surface text-fg"
    >
      {children}
    </button>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between border-b border-border py-3 last:border-b-0">
      <span className="text-sm font-medium text-fg">{label}</span>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={cn(
          "relative h-[26px] w-11 shrink-0 rounded-full border transition",
          checked ? "border-primary-bright/45 bg-primary/20" : "border-border bg-surface-2",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-5 rounded-full transition",
            checked ? "translate-x-[18px] bg-primary-bright" : "bg-muted",
          )}
        />
      </span>
    </label>
  );
}

function sendNotification(title: string, body: string) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    const n = new Notification(title, {
      body,
      icon: "/icons/icon-192.png",
      tag: "bz-expiry",
    });
    window.setTimeout(() => n.close(), 12000);
  } catch {
    /* ignore */
  }
}
