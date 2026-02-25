import type { FutureId } from "./futures";

export type Level = "low" | "med" | "high";
export type PlanId = "A" | "B" | "C";

export type Plan = {
  id: PlanId;
  title: string;
  tagline: string;
  perf: Record<FutureId, Level>;
};

export const PLANS: Plan[] = [
  {
    id: "A",
    title: "Plan A",
    tagline: "High upside, more variability",
    perf: { hot_dry: "low", pests: "high", market: "high", benign: "high" },
  },
  {
    id: "B",
    title: "Plan B",
    tagline: "Balanced across futures",
    perf: { hot_dry: "med", pests: "med", market: "med", benign: "med" },
  },
  {
    id: "C",
    title: "Plan C",
    tagline: "Stable, fewer surprises",
    perf: { hot_dry: "high", pests: "med", market: "low", benign: "med" },
  },
];