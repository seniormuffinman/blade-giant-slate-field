import { DEFAULT_SETTINGS, STORAGE, type Holiday, type Session, type Settings } from "./constants";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
}

export function loadSettings(): Settings {
  const s = readJson<Partial<Settings> | null>(STORAGE.settings, null);
  return { ...DEFAULT_SETTINGS, ...(s ?? {}) };
}

export function saveSettings(s: Settings) {
  writeJson(STORAGE.settings, s);
}

export function loadSession(): Session | null {
  const s = readJson<Session | null>(STORAGE.session, null);
  if (s && typeof s.leaveByMs === "number" && s.leaveByMs > Date.now() - 60_000) {
    return s;
  }
  return null;
}

export function saveSession(s: Session | null) {
  if (!s) {
    localStorage.removeItem(STORAGE.session);
    localStorage.removeItem(STORAGE.notified);
    return;
  }
  writeJson(STORAGE.session, s);
}

export function loadNotified() {
  return !!readJson(STORAGE.notified, false);
}

export function saveNotified(v: boolean) {
  writeJson(STORAGE.notified, v);
}

export function loadHolidays(canton: string): Holiday[] {
  const cached = readJson<{ canton?: string; holidays?: Holiday[] } | null>(STORAGE.holidays, null);
  if (cached?.canton === canton && Array.isArray(cached.holidays)) return cached.holidays;
  return [];
}

export function saveHolidays(canton: string, holidays: Holiday[]) {
  writeJson(STORAGE.holidays, { canton, year: new Date().getFullYear(), holidays });
}
