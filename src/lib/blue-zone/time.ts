export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function formatClock(d: Date) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function dateKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function minutesSinceMidnight(d: Date) {
  return d.getHours() * 60 + d.getMinutes();
}

export function fromMinutes(m: number) {
  const wrapped = ((m % 1440) + 1440) % 1440;
  const h = Math.floor(wrapped / 60);
  const min = wrapped % 60;
  return `${pad(h)}:${pad(min)}`;
}

/** Next half-hour mark strictly after the current minute-of-day. */
export function nextTimeLineAfter(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return h * 60 + 30;
  if (m < 30) return h * 60 + 30;
  return (h + 1) * 60;
}

/** Clock position in degrees; 00:00 = 0° (12 o'clock). */
export function timeLabelToDegrees(label: string | null) {
  if (!label || !/^\d{1,2}:\d{2}$/.test(label)) return 0;
  const [hs, ms] = label.split(":");
  const h = Number(hs);
  const m = Number(ms);
  return ((h % 24) + m / 60) * 15;
}

export function formatRemaining(ms: number) {
  if (ms <= 0) return "00:00";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}
