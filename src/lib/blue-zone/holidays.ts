import type { Holiday } from "./constants";

export async function fetchHolidays(canton: string): Promise<Holiday[]> {
  const year = new Date().getFullYear();
  const urls = [year, year + 1].map(
    (y) =>
      `https://openholidaysapi.org/PublicHolidays?countryIsoCode=CH&languageIsoCode=EN&validFrom=${y}-01-01&validTo=${y}-12-31&subdivisionCode=CH-${canton}`,
  );

  const results = await Promise.all(
    urls.map((u) =>
      fetch(u).then((r) => (r.ok ? r.json() : [])).catch(() => []),
    ),
  );

  const map = new Map<string, Holiday>();
  for (const arr of results) {
    if (!Array.isArray(arr)) continue;
    for (const h of arr) {
      if (!h || (h.type !== "Public" && h.type !== "Optional")) continue;
      if (typeof h.startDate !== "string") continue;
      const name =
        (h.name && h.name[0] && h.name[0].text) || "Public holiday";
      if (!map.has(h.startDate)) {
        map.set(h.startDate, { date: h.startDate, name: String(name).slice(0, 80) });
      }
    }
  }
  return Array.from(map.values());
}
