# Blue Zone Parking — Project Log

Living document of design decisions, features, and iteration history.
Update this file whenever the app changes meaningfully.

---

## Current version: **0.3.0** (2026-09-11)

### Summary
Mobile-first PWA for Swiss Blue Zone / parking-disc rules. Uses device clock, optional GPS → canton, OpenHolidays API, a parking session timer with notifications, and an animated skeuomorphic disc.

### Features (v0.3.0)

| Area | Behaviour |
|------|-----------|
| **Clock** | Live device time, updates every second |
| **Location** | Auto-detect on open (GPS → nearest canton). Can disable in Settings |
| **Public holidays** | Fetched per canton from OpenHolidays API; chip shown only when today is a holiday or Sunday |
| **Rules engine** | Mon–Sat windows (1 h / midday / overnight); free on Sun & holidays |
| **Park session** | “Park now” starts countdown to leave-by; persists in `localStorage` |
| **Notifications** | Optional; fires once when remaining time ≤ configured minutes (default 10) |
| **Settings** | Canton, notify lead time, enable notifications, force holiday, auto-location |
| **Info** | Rules in a sheet |
| **Disc animation** | Wheel spins from 00:00 to the set half-hour (red pointer, 24h scale). Respects reduced-motion |
| **Download** | Zip of the standalone folder for GitHub Pages / offline |

### Disc animation
- Outer blue rim: 24-hour labels + 30-minute ticks
- Inner white wheel rotates so the red pointer indicates the time to set
- Opening the disc sheet replays the spin (1.35s ease-out)
- Mini disc on the main “Set disc to” tile stays at the current target

### Storage keys

| Key | Content |
|-----|---------|
| `bz.settings.v1` | canton, notifyMins, notifyOn, forceHoliday, autoLoc |
| `bz.session.v1` | startMs, leaveByMs, discLabel, leaveLabel |
| `bz.holidays.v1` | cached holiday list for canton + year |
| `bz.notified.v1` | whether expiry notification already sent for current session |

---

## History

### 0.1.0 (2026-09-11)
- Initial single-page helper, live clock, rule windows, canton + holidays, PWA

### 0.2.0 (2026-09-11)
- Main UI chips, Park session, notifications, settings/rules sheets, version badge

### 0.3.0 (2026-09-11)
- Animated skeuomorphic parking disc
- Zip download of the standalone app folder
