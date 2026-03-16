export type NavSection = {
  id: string;
  labelKey: "hero" | "hours" | "trainers" | "services" | "contact";
};

export const NAV_SECTIONS: NavSection[] = [
  { id: "hero", labelKey: "hero" },
  { id: "working-hours", labelKey: "hours" },
  { id: "trainers", labelKey: "trainers" },
  { id: "services", labelKey: "services" },
  { id: "contact", labelKey: "contact" },
];