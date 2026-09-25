# Blue Zone Parking — changelog

## Current version: 0.3.1 — 25 September 2026

Parking-disc helper for Swiss Blue Zone rules. Device clock, optional GPS → canton, public holidays, park timer with notifications, animated disc.

| Area | Behaviour |
|------|-----------|
| Clock | Live device time |
| Location | Auto-detect on open (GPS → nearest canton). Can disable in Settings |
| Public holidays | Per canton via OpenHolidays API; chip only on a holiday or Sunday |
| Rules | Mon–Sat windows (1 h / midday / overnight); free on Sun & holidays |
| Park | Countdown to leave-by; stored in the browser |
| Notifications | Optional; once, N minutes before expiry (default 10) |
| Settings | Canton, notify lead time, notifications, force holiday, auto-location |
| Disc | Wheel spins to the half-hour you should set |

### Storage

| Key | Content |
|-----|---------|
| `bz.settings.v1` | canton, notifyMins, notifyOn, forceHoliday, autoLoc |
| `bz.session.v1` | startMs, leaveByMs, discLabel, leaveLabel |
| `bz.holidays.v1` | cached holidays for canton + year |
| `bz.notified.v1` | whether the expiry notification already fired |

---

## History

### 0.3.1 — 25 September 2026
- GitLab Pages job so `index.html` is published at the site root
- Simpler README
- Removed zip download

### 0.3.0 — 11 September 2026
- Animated parking disc

### 0.2.0 — 11 September 2026
- Park session, notifications, settings and rules sheets

### 0.1.0 — 11 September 2026
- First helper: live clock, rule windows, canton + holidays
