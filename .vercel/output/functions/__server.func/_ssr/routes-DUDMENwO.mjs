import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Info, c as Bell, i as MapPin, o as Download, r as Settings, s as CircleParking, t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DUDMENwO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function pad(n) {
	return String(n).padStart(2, "0");
}
function formatClock(d) {
	return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function dateKey(d) {
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function minutesSinceMidnight(d) {
	return d.getHours() * 60 + d.getMinutes();
}
function fromMinutes(m) {
	const wrapped = (m % 1440 + 1440) % 1440;
	const h = Math.floor(wrapped / 60);
	const min = wrapped % 60;
	return `${pad(h)}:${pad(min)}`;
}
/** Next half-hour mark strictly after the current minute-of-day. */
function nextTimeLineAfter(mins) {
	const h = Math.floor(mins / 60);
	const m = mins % 60;
	if (m === 0) return h * 60 + 30;
	if (m < 30) return h * 60 + 30;
	return (h + 1) * 60;
}
/** Clock position in degrees; 00:00 = 0° (12 o'clock). */
function timeLabelToDegrees(label) {
	if (!label || !/^\d{1,2}:\d{2}$/.test(label)) return 0;
	const [hs, ms] = label.split(":");
	const h = Number(hs);
	const m = Number(ms);
	return (h % 24 + m / 60) * 15;
}
function formatRemaining(ms) {
	if (ms <= 0) return "00:00";
	const totalSec = Math.floor(ms / 1e3);
	const h = Math.floor(totalSec / 3600);
	const m = Math.floor(totalSec % 3600 / 60);
	const s = totalSec % 60;
	if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
	return `${pad(m)}:${pad(s)}`;
}
function ParkingDisc({ timeLabel, animate = true, size = "hero", className }) {
	const target = timeLabelToDegrees(timeLabel);
	const [angle, setAngle] = (0, import_react.useState)(animate ? 0 : target);
	const [spinning, setSpinning] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!animate || reduced) {
			setAngle(target);
			setSpinning(false);
			return;
		}
		setAngle(0);
		setSpinning(true);
		const id = window.setTimeout(() => setAngle(target), 80);
		const done = window.setTimeout(() => setSpinning(false), 1600);
		return () => {
			window.clearTimeout(id);
			window.clearTimeout(done);
		};
	}, [
		animate,
		target,
		timeLabel
	]);
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const ticks = Array.from({ length: 48 }, (_, i) => i);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("bz-disc relative shrink-0", size === "hero" ? "h-60 w-60" : "h-16 w-16", className),
		role: "img",
		"aria-label": timeLabel ? `Parking disc set to ${timeLabel}` : "Parking disc",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bz-disc-body absolute inset-0 rounded-full" }),
			size === "hero" && ticks.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("bz-disc-tick absolute left-1/2 top-[5%] origin-[50%_900%]", i % 2 === 0 ? "h-2.5 w-0.5 bg-white/80" : "h-1.5 w-px bg-white/40"),
				style: { transform: `translateX(-50%) rotate(${i * 7.5}deg)` }
			}, `t-${i}`)),
			size === "hero" && hours.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bz-disc-hour absolute left-1/2 top-[11%] origin-[50%_380%] text-[9px]",
				style: { transform: `translateX(-50%) rotate(${h * 15}deg)` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						display: "inline-block",
						transform: `rotate(${-h * 15}deg)`
					},
					children: String(h).padStart(2, "0")
				})
			}, h)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("bz-disc-wheel absolute left-1/2 top-1/2 rounded-full", size === "hero" ? "h-[68%] w-[68%]" : "h-[70%] w-[70%]", spinning && "bz-disc-spinning"),
				style: { transform: `translate(-50%, -50%) rotate(${angle}deg)` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bz-disc-pointer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bz-disc-window" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bz-disc-hub absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full",
				children: size === "hero" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[8px] font-bold uppercase tracking-[0.14em] text-slate-500",
					children: "Set to"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-sans text-3xl font-extrabold leading-none tracking-tight text-slate-900 tabular-nums",
					children: timeLabel ?? "—"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[8px] font-bold text-slate-800 tabular-nums",
					children: timeLabel ?? "—"
				})
			})
		]
	});
}
function Sheet({ open, title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": "Close",
		className: `fixed inset-0 z-40 bg-black/55 backdrop-blur-[4px] transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`,
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": title,
		className: `fixed bottom-0 left-1/2 z-50 flex max-h-[88dvh] w-full max-w-[430px] -translate-x-1/2 flex-col overflow-y-auto rounded-t-[22px] border border-b-0 border-border bg-surface px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "translate-y-0" : "translate-y-full"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-4 h-1 w-9 rounded-full bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				className: "absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-border bg-surface-2 text-muted",
				"aria-label": "Close",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3.5 text-lg font-bold tracking-tight text-fg",
				children: title
			}),
			children
		]
	})] });
}
var VERSION = "0.3.0";
var STORAGE = {
	settings: "bz.settings.v1",
	session: "bz.session.v1",
	holidays: "bz.holidays.v1",
	notified: "bz.notified.v1"
};
var DAYS = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
var CANTON_CENTERS = {
	ZH: [47.3769, 8.5417],
	BE: [46.948, 7.4474],
	GE: [46.2044, 6.1432],
	VD: [46.5197, 6.6323],
	BS: [47.5596, 7.5886],
	BL: [47.4416, 7.7649],
	AG: [47.39, 8.045],
	SG: [47.4245, 9.3767],
	LU: [47.0502, 8.3093],
	TI: [46.2044, 9.0211],
	VS: [46.2333, 7.6],
	ZG: [47.1662, 8.5155],
	FR: [46.8065, 7.162],
	SO: [47.2088, 7.5323],
	TG: [47.6038, 9.055],
	SH: [47.6973, 8.6349],
	GR: [46.8499, 9.5329],
	NE: [46.99, 6.9293],
	JU: [47.3654, 7.3452],
	SZ: [47.0207, 8.653],
	UR: [46.8804, 8.6444],
	OW: [46.877, 8.251],
	NW: [46.9268, 8.385],
	GL: [47.0404, 9.0672],
	AR: [47.3667, 9.3],
	AI: [47.3308, 9.409]
};
var CANTON_NAMES = {
	ZH: "Zürich",
	BE: "Bern",
	GE: "Genève",
	VD: "Vaud",
	BS: "Basel-Stadt",
	BL: "Basel-Land",
	AG: "Aargau",
	SG: "St. Gallen",
	LU: "Luzern",
	TI: "Ticino",
	VS: "Valais",
	ZG: "Zug",
	FR: "Fribourg",
	SO: "Solothurn",
	TG: "Thurgau",
	SH: "Schaffhausen",
	GR: "Graubünden",
	NE: "Neuchâtel",
	JU: "Jura",
	SZ: "Schwyz",
	UR: "Uri",
	OW: "Obwalden",
	NW: "Nidwalden",
	GL: "Glarus",
	AR: "Appenzell AR",
	AI: "Appenzell IR"
};
var CANTON_ORDER = Object.keys(CANTON_NAMES);
var DEFAULT_SETTINGS = {
	canton: "ZH",
	notifyMins: 10,
	notifyOn: true,
	forceHoliday: false,
	autoLoc: true
};
function haversine(lat1, lon1, lat2, lon2) {
	const R = 6371;
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLon = (lon2 - lon1) * Math.PI / 180;
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
	return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function nearestCanton(lat, lon) {
	let best = "ZH";
	let bestDist = Infinity;
	for (const [code, [clat, clon]] of Object.entries(CANTON_CENTERS)) {
		const d = haversine(lat, lon, clat, clon);
		if (d < bestDist) {
			bestDist = d;
			best = code;
		}
	}
	return best;
}
async function fetchHolidays(canton) {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const urls = [year, year + 1].map((y) => `https://openholidaysapi.org/PublicHolidays?countryIsoCode=CH&languageIsoCode=EN&validFrom=${y}-01-01&validTo=${y}-12-31&subdivisionCode=CH-${canton}`);
	const results = await Promise.all(urls.map((u) => fetch(u).then((r) => r.ok ? r.json() : []).catch(() => [])));
	const map = /* @__PURE__ */ new Map();
	for (const arr of results) {
		if (!Array.isArray(arr)) continue;
		for (const h of arr) {
			if (!h || h.type !== "Public" && h.type !== "Optional") continue;
			if (typeof h.startDate !== "string") continue;
			const name = h.name && h.name[0] && h.name[0].text || "Public holiday";
			if (!map.has(h.startDate)) map.set(h.startDate, {
				date: h.startDate,
				name: String(name).slice(0, 80)
			});
		}
	}
	return Array.from(map.values());
}
function computeRules(now, isHoliday, holidayName) {
	const isSun = now.getDay() === 0;
	const mins = minutesSinceMidnight(now);
	if (isHoliday || isSun) return {
		title: "No time limit",
		sub: isHoliday ? `${holidayName} · free unless extra sign` : "Sunday · free unless extra sign",
		disc: null,
		leaveBy: null,
		tone: "ok",
		free: true
	};
	if (mins >= 1140 || mins < 480) {
		if (mins < 480) return {
			title: "Valid until 09:00",
			sub: "Arrival before 08:00",
			disc: fromMinutes(nextTimeLineAfter(mins)),
			leaveBy: "09:00",
			tone: "warn",
			free: false
		};
		return {
			title: "No disc needed",
			sub: "Until 08:00 if you leave before then",
			disc: null,
			leaveBy: "08:00",
			tone: "accent",
			free: true
		};
	}
	if (mins >= 480 && mins < 690) {
		const setTo = nextTimeLineAfter(mins);
		return {
			title: "Max 1 hour",
			sub: "08:00 – 11:30",
			disc: fromMinutes(setTo),
			leaveBy: fromMinutes(setTo + 60),
			tone: "accent",
			free: false
		};
	}
	if (mins >= 690 && mins < 810) return {
		title: "Valid until 14:30",
		sub: "Midday window (11:30–13:30)",
		disc: fromMinutes(nextTimeLineAfter(mins)),
		leaveBy: "14:30",
		tone: "warn",
		free: false
	};
	if (mins >= 810 && mins < 1080) {
		const setTo = nextTimeLineAfter(mins);
		return {
			title: "Max 1 hour",
			sub: "13:30 – 18:00",
			disc: fromMinutes(setTo),
			leaveBy: fromMinutes(setTo + 60),
			tone: "accent",
			free: false
		};
	}
	if (mins >= 1080 && mins < 1140) return {
		title: "Valid until 09:00",
		sub: "Evening arrival",
		disc: fromMinutes(nextTimeLineAfter(mins)),
		leaveBy: "09:00",
		tone: "warn",
		free: false
	};
	return {
		title: "Check signs",
		sub: "Unable to determine for this moment",
		disc: null,
		leaveBy: null,
		tone: "muted",
		free: false
	};
}
function readJson(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return fallback;
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}
function writeJson(key, value) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}
function loadSettings() {
	const s = readJson(STORAGE.settings, null);
	return {
		...DEFAULT_SETTINGS,
		...s ?? {}
	};
}
function saveSettings(s) {
	writeJson(STORAGE.settings, s);
}
function loadSession() {
	const s = readJson(STORAGE.session, null);
	if (s && typeof s.leaveByMs === "number" && s.leaveByMs > Date.now() - 6e4) return s;
	return null;
}
function saveSession(s) {
	if (!s) {
		localStorage.removeItem(STORAGE.session);
		localStorage.removeItem(STORAGE.notified);
		return;
	}
	writeJson(STORAGE.session, s);
}
function loadNotified() {
	return !!readJson(STORAGE.notified, false);
}
function saveNotified(v) {
	writeJson(STORAGE.notified, v);
}
function loadHolidays(canton) {
	const cached = readJson(STORAGE.holidays, null);
	if (cached?.canton === canton && Array.isArray(cached.holidays)) return cached.holidays;
	return [];
}
function saveHolidays(canton, holidays) {
	writeJson(STORAGE.holidays, {
		canton,
		year: (/* @__PURE__ */ new Date()).getFullYear(),
		holidays
	});
}
function BlueZoneApp() {
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [settings, setSettings] = (0, import_react.useState)(DEFAULT_SETTINGS);
	const [holidays, setHolidays] = (0, import_react.useState)([]);
	const [session, setSession] = (0, import_react.useState)(null);
	const [locLabel, setLocLabel] = (0, import_react.useState)("Zürich");
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [holidayMeta, setHolidayMeta] = (0, import_react.useState)("Holidays: —");
	const [notified, setNotified] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const s = loadSettings();
		setSettings(s);
		setHolidays(loadHolidays(s.canton));
		setSession(loadSession());
		setNotified(loadNotified());
		setLocLabel(CANTON_NAMES[s.canton] ?? s.canton);
		setReady(true);
		const t = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(t);
	}, []);
	const persist = (0, import_react.useCallback)((next) => {
		setSettings(next);
		saveSettings(next);
	}, []);
	const loadHolidayData = (0, import_react.useCallback)(async (canton) => {
		try {
			const list = await fetchHolidays(canton);
			setHolidays(list);
			saveHolidays(canton, list);
			setHolidayMeta(`Holidays loaded for CH-${canton} · OpenHolidays API`);
		} catch {
			setHolidayMeta("Holiday data offline — use toggle if needed");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		loadHolidayData(settings.canton);
	}, [
		ready,
		settings.canton,
		loadHolidayData
	]);
	(0, import_react.useEffect)(() => {
		if (!sheet) return;
		const onKey = (e) => {
			if (e.key === "Escape") setSheet(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [sheet]);
	(0, import_react.useEffect)(() => {
		if (!ready || !settings.autoLoc || !navigator.geolocation) return;
		setLocLabel("Locating…");
		navigator.geolocation.getCurrentPosition((pos) => {
			const code = nearestCanton(pos.coords.latitude, pos.coords.longitude);
			setLocLabel(CANTON_NAMES[code] ?? code);
			if (code !== settings.canton) persist({
				...settings,
				canton: code
			});
		}, () => {
			setLocLabel(`${CANTON_NAMES[settings.canton] ?? settings.canton} · GPS off`);
		}, {
			enableHighAccuracy: false,
			timeout: 1e4,
			maximumAge: 3e5
		});
	}, [ready, settings.autoLoc]);
	const holidayToday = (0, import_react.useMemo)(() => {
		if (settings.forceHoliday) return {
			yes: true,
			name: "Public holiday (manual)"
		};
		const key = dateKey(now);
		const found = holidays.find((h) => h.date === key);
		return found ? {
			yes: true,
			name: found.name
		} : {
			yes: false,
			name: ""
		};
	}, [
		holidays,
		now,
		settings.forceHoliday
	]);
	const isSunday = now.getDay() === 0;
	const rules = (0, import_react.useMemo)(() => computeRules(now, holidayToday.yes, holidayToday.name), [now, holidayToday]);
	const showHolidayChip = holidayToday.yes || isSunday;
	const holidayChipLabel = holidayToday.yes ? holidayToday.name : "Sunday";
	(0, import_react.useEffect)(() => {
		if (!session) return;
		const left = session.leaveByMs - Date.now();
		if (settings.notifyOn && !notified && left > 0 && left <= settings.notifyMins * 60 * 1e3) {
			sendNotification(`Blue Zone — ${formatRemaining(left)} left`, `Leave by ${session.leaveLabel}. Move your vehicle soon.`);
			setNotified(true);
			saveNotified(true);
		}
	}, [
		now,
		session,
		settings.notifyOn,
		settings.notifyMins,
		notified
	]);
	function flash(msg) {
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
		const next = {
			startMs: now.getTime(),
			leaveByMs: leave.getTime(),
			discLabel: rules.disc ?? "—",
			leaveLabel: rules.leaveBy
		};
		setSession(next);
		saveSession(next);
		setNotified(false);
		saveNotified(false);
		if (settings.notifyOn && "Notification" in window && Notification.permission === "default") Notification.requestPermission();
		flash(`Parking started · leave by ${rules.leaveBy}`);
	}
	function endPark() {
		setSession(null);
		saveSession(null);
		setNotified(false);
		flash("Parking ended");
	}
	const remaining = session ? session.leaveByMs - now.getTime() : 0;
	const timerTone = remaining <= 0 || remaining <= 3e5 ? "danger" : remaining <= settings.notifyMins * 60 * 1e3 ? "warn" : "accent";
	const toneBar = rules.tone === "ok" ? "bg-ok" : rules.tone === "warn" ? "bg-warn" : rules.tone === "accent" ? "bg-primary-bright" : "bg-muted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-[430px] flex-col px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-9 place-items-center rounded-[10px] bg-linear-to-br from-primary-bright to-primary text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(37,99,235,0.4)]",
						children: "BZ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-base font-semibold tracking-tight text-fg",
						children: "Blue Zone"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] font-medium text-muted",
						children: ["v", VERSION]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "Rules",
						onClick: () => setSheet("rules"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "Settings",
						onClick: () => setSheet("settings"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-fg tabular-nums",
						children: formatClock(now)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: DAYS[now.getDay()] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: locLabel })] }),
					showHolidayChip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						holiday: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: holidayChipLabel })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative mb-3.5 overflow-hidden rounded-[18px] border border-border bg-surface px-5 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-x-0 top-0 h-1", toneBar) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-muted",
						children: "Status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mb-1 text-2xl font-bold tracking-tight text-fg",
						children: rules.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] text-muted",
						children: rules.sub
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3.5 grid grid-cols-2 gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[14px] border border-border bg-surface p-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-muted",
						children: ["Set disc to", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSheet("disc"),
							className: "grid size-6 place-items-center rounded-full border border-border bg-surface-2 text-[11px] font-bold text-muted",
							"aria-label": "How to set the disc",
							children: "i"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParkingDisc, {
							timeLabel: rules.disc,
							animate: false,
							size: "tile"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[22px] font-bold tracking-tight text-fg tabular-nums",
							children: rules.disc ?? "—"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted",
							children: rules.disc ? "Next half-hour" : "Not required"
						})] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[14px] border border-border bg-surface p-3.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted",
							children: "Leave by"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[22px] font-bold tracking-tight text-fg tabular-nums",
							children: rules.leaveBy ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted",
							children: rules.leaveBy ? "Must be gone by" : "—"
						})
					]
				})]
			}),
			session && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3.5 rounded-[18px] border border-primary-bright/35 bg-linear-to-b from-[#152038] to-surface px-4 py-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted",
						children: "Time remaining"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("text-[40px] font-bold leading-none tracking-tight tabular-nums", timerTone === "danger" ? "text-danger" : timerTone === "warn" ? "text-warn" : "text-primary-bright"),
						children: remaining <= 0 ? "00:00" : formatRemaining(remaining)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-muted",
						children: remaining <= 0 ? "Time expired · move the vehicle" : `Leave by ${session.leaveLabel} · disc ${session.discLabel}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: endPark,
						className: "mt-3.5 rounded-[10px] border border-danger/30 bg-danger/15 px-3.5 py-2.5 text-[13px] font-semibold text-danger",
						children: "End parking"
					})
				]
			}),
			!session && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: startPark,
				disabled: rules.free && !rules.leaveBy,
				className: "mb-4 flex items-center justify-center gap-2 rounded-[14px] bg-linear-to-br from-primary-bright to-primary px-4 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_20px_rgba(37,99,235,0.35)] disabled:cursor-not-allowed disabled:opacity-45",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleParking, { className: "size-5" }), "Park now"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-auto pt-3 text-center text-[11px] text-muted/70",
				children: "Follow local signs · Signaling Ordinance 1979"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: sheet === "disc",
				title: "Set your disc",
				onClose: () => setSheet(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParkingDisc, {
						timeLabel: rules.disc,
						animate: sheet === "disc",
						size: "hero"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "max-w-[280px] text-center text-[13px] leading-relaxed text-muted",
						children: [
							"Set the wheel to the ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-medium text-fg",
								children: "next half-hour mark after"
							}),
							" you arrive.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Example: arrive ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-medium text-fg",
								children: "9:05"
							}),
							" → set",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-medium text-fg",
								children: "9:30"
							}),
							" → leave by",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-medium text-fg",
								children: "10:30"
							}),
							"."
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: sheet === "rules",
				title: "Rules",
				onClose: () => setSheet(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 text-[13px] leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold text-fg",
							children: "Time limits (Mon–Sat)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "list-disc space-y-1 pl-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["08:00–11:30 & 13:30–18:00 → max ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-medium text-fg",
									children: "1 hour"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Arrival 11:30–13:30 → valid until ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-medium text-fg",
									children: "14:30"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Arrival 18:00–08:00 → valid until ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-medium text-fg",
									children: "09:00"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold text-fg",
							children: "Sundays & public holidays"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No time limit unless an extra sign says otherwise." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold text-fg",
							children: "Setting the disc"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Set the wheel to the ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-medium text-fg",
								children: "next time-line after"
							}),
							" arrival. Electronic discs are not permitted. Disc must be clearly visible and upright."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold text-fg",
							children: "No disc needed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "19:00–07:59 if you rejoin traffic before 08:00." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold text-fg",
							children: "Invalid if"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "list-disc space-y-1 pl-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Slanted or not fully visible" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Arrival time set incorrectly" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Max parking time exceeded" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Time re-adjusted without rejoining traffic" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13px] font-semibold text-fg",
							children: "Where to get a disc"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "list-disc space-y-1 pl-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Transport Service licensing office — Mühlegasse 18" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Zurich City Police guards" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Specialist retailers" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pt-2 text-[11px] opacity-70",
							children: "Legal basis: Signaling Ordinance of 5 September 1979. Always follow local signs."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				open: sheet === "settings",
				title: "Settings",
				onClose: () => setSheet(null),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted",
						children: "Canton"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: settings.canton,
						onChange: (e) => {
							const canton = e.target.value;
							persist({
								...settings,
								canton
							});
							setLocLabel(CANTON_NAMES[canton] ?? canton);
						},
						className: "mb-4 w-full rounded-xl border border-border bg-surface-2 px-3.5 py-3 text-[15px] font-medium text-fg outline-none",
						children: CANTON_ORDER.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: code,
							children: CANTON_NAMES[code]
						}, code))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted",
						children: "Notify before expiry (minutes)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						max: 60,
						value: settings.notifyMins,
						onChange: (e) => persist({
							...settings,
							notifyMins: Math.min(60, Math.max(1, Number(e.target.value) || 10))
						}),
						className: "mb-3 w-full rounded-xl border border-border bg-surface-2 px-3.5 py-3 text-[15px] font-medium text-fg outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Enable notifications",
						checked: settings.notifyOn,
						onChange: (v) => {
							persist({
								...settings,
								notifyOn: v
							});
							if (v && "Notification" in window && Notification.permission === "default") Notification.requestPermission();
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Treat as public holiday",
						checked: settings.forceHoliday,
						onChange: (v) => persist({
							...settings,
							forceHoliday: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Auto-detect location",
						checked: settings.autoLoc,
						onChange: (v) => persist({
							...settings,
							autoLoc: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/blue-zone-parking.zip",
						download: "blue-zone-parking.zip",
						className: "mt-5 flex items-center justify-center gap-2 rounded-[14px] border border-border bg-surface-2 px-4 py-3 text-sm font-semibold text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Download app folder (.zip)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 flex items-center gap-1.5 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-3.5" }), holidayMeta]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("bz-toast pointer-events-none fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 max-w-[90%] -translate-x-1/2 rounded-xl border border-border bg-surface-2 px-5 py-3 text-center text-[13px] font-medium text-fg shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition", toast ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"),
				role: "status",
				children: toast
			})
		]
	});
}
function Chip({ children, holiday }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium tabular-nums", holiday ? "border-ok/30 bg-ok/15 text-ok" : "border-border bg-surface text-muted"),
		children
	});
}
function IconBtn({ label, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		onClick,
		className: "grid size-10 place-items-center rounded-xl border border-border bg-surface text-fg",
		children
	});
}
function Toggle({ label, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center justify-between border-b border-border py-3 last:border-b-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-fg",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				className: "peer sr-only",
				checked,
				onChange: (e) => onChange(e.target.checked)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("relative h-[26px] w-11 shrink-0 rounded-full border transition", checked ? "border-primary-bright/45 bg-primary/20" : "border-border bg-surface-2"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0.5 left-0.5 size-5 rounded-full transition", checked ? "translate-x-[18px] bg-primary-bright" : "bg-muted") })
			})
		]
	});
}
function sendNotification(title, body) {
	if (!("Notification" in window)) return;
	if (Notification.permission !== "granted") return;
	try {
		const n = new Notification(title, {
			body,
			icon: "/icons/icon-192.png",
			tag: "bz-expiry"
		});
		window.setTimeout(() => n.close(), 12e3);
	} catch {}
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlueZoneApp, {});
}
//#endregion
export { Home as component };
