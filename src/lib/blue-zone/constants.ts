export const VERSION = "0.3.1";

export const STORAGE = {
  settings: "bz.settings.v1",
  session: "bz.session.v1",
  holidays: "bz.holidays.v1",
  notified: "bz.notified.v1",
} as const;

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const CANTON_CENTERS: Record<string, [number, number]> = {
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
  AI: [47.3308, 9.409],
};

export const CANTON_NAMES: Record<string, string> = {
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
  AI: "Appenzell IR",
};

export const CANTON_ORDER = Object.keys(CANTON_NAMES);

export type Settings = {
  canton: string;
  notifyMins: number;
  notifyOn: boolean;
  forceHoliday: boolean;
  autoLoc: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  canton: "ZH",
  notifyMins: 10,
  notifyOn: true,
  forceHoliday: false,
  autoLoc: true,
};

export type Session = {
  startMs: number;
  leaveByMs: number;
  discLabel: string;
  leaveLabel: string;
};

export type Holiday = { date: string; name: string };

export type Rules = {
  title: string;
  sub: string;
  disc: string | null;
  leaveBy: string | null;
  tone: "ok" | "warn" | "accent" | "muted";
  free: boolean;
};
