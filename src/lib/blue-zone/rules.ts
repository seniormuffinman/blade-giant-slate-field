import type { Rules } from "./constants";
import { fromMinutes, minutesSinceMidnight, nextTimeLineAfter } from "./time";

export function computeRules(now: Date, isHoliday: boolean, holidayName: string): Rules {
  const isSun = now.getDay() === 0;
  const mins = minutesSinceMidnight(now);

  if (isHoliday || isSun) {
    return {
      title: "No time limit",
      sub: isHoliday
        ? `${holidayName} · free unless extra sign`
        : "Sunday · free unless extra sign",
      disc: null,
      leaveBy: null,
      tone: "ok",
      free: true,
    };
  }

  if (mins >= 19 * 60 || mins < 8 * 60) {
    if (mins < 8 * 60) {
      const setTo = nextTimeLineAfter(mins);
      return {
        title: "Valid until 09:00",
        sub: "Arrival before 08:00",
        disc: fromMinutes(setTo),
        leaveBy: "09:00",
        tone: "warn",
        free: false,
      };
    }
    return {
      title: "No disc needed",
      sub: "Until 08:00 if you leave before then",
      disc: null,
      leaveBy: "08:00",
      tone: "accent",
      free: true,
    };
  }

  if (mins >= 8 * 60 && mins < 11 * 60 + 30) {
    const setTo = nextTimeLineAfter(mins);
    return {
      title: "Max 1 hour",
      sub: "08:00 – 11:30",
      disc: fromMinutes(setTo),
      leaveBy: fromMinutes(setTo + 60),
      tone: "accent",
      free: false,
    };
  }

  if (mins >= 11 * 60 + 30 && mins < 13 * 60 + 30) {
    const setTo = nextTimeLineAfter(mins);
    return {
      title: "Valid until 14:30",
      sub: "Midday window (11:30–13:30)",
      disc: fromMinutes(setTo),
      leaveBy: "14:30",
      tone: "warn",
      free: false,
    };
  }

  if (mins >= 13 * 60 + 30 && mins < 18 * 60) {
    const setTo = nextTimeLineAfter(mins);
    return {
      title: "Max 1 hour",
      sub: "13:30 – 18:00",
      disc: fromMinutes(setTo),
      leaveBy: fromMinutes(setTo + 60),
      tone: "accent",
      free: false,
    };
  }

  if (mins >= 18 * 60 && mins < 19 * 60) {
    const setTo = nextTimeLineAfter(mins);
    return {
      title: "Valid until 09:00",
      sub: "Evening arrival",
      disc: fromMinutes(setTo),
      leaveBy: "09:00",
      tone: "warn",
      free: false,
    };
  }

  return {
    title: "Check signs",
    sub: "Unable to determine for this moment",
    disc: null,
    leaveBy: null,
    tone: "muted",
    free: false,
  };
}
