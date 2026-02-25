export type FutureId = "A" | "B" | "C";
export type TimeId = "now" | "y20" | "y50" | "y80";
export type Level = "High" | "Medium" | "Low";
export type Carbon = "Sink" | "Neutral" | "Source";
export type Threshold = "Above" | "Near" | "Below";

export type StrategyId = "A" | "B" | "C" | "D";

export const FUTURES: { id: FutureId; label: string; icon: string; desc: string }[] = [
  { id: "A", label: "Future A", icon: "🌤️", desc: "Mild climate stress; stable operations and markets." },
  { id: "B", label: "Future B", icon: "🌦️", desc: "Intermittent drought and pests; some market volatility." },
  { id: "C", label: "Future C", icon: "🌪️", desc: "Compound shocks: prolonged drought + pest outbreaks + unstable timber prices." },
];

export const TIMES: { id: TimeId; label: string }[] = [
  { id: "now", label: "Now" },
  { id: "y20", label: "20y" },
  { id: "y50", label: "50y" },
  { id: "y80", label: "80y" },
];

export type Strategy = {
  id: StrategyId;
  title: string;
  subtitle: string;
  visual: string; // short imagery description
  // dashboard values per future
  timber: Record<FutureId, Level>;
  carbon: Record<FutureId, Carbon>;
  biodiversity: Record<FutureId, Level>;
  // threshold trajectory per future across time strip
  threshold: Record<FutureId, Record<TimeId, Threshold>>;
};

export const STRATEGIES: Strategy[] = [
  {
    id: "A",
    title: "Strategy A — Uniform Production Stand",
    subtitle: "Dense, uniform spruce; engineered for yield.",
    visual:
      "A dense monoculture of Norway spruce in straight rows. Clear extraction paths, frequent thinning, uniform canopy.",
    timber: { A: "High", B: "Medium", C: "Low" },
    carbon: { A: "Sink", B: "Neutral", C: "Source" },
    biodiversity: { A: "Low", B: "Low", C: "Low" },
    threshold: {
      A: { now: "Above", y20: "Above", y50: "Near", y80: "Near" },
      B: { now: "Above", y20: "Near", y50: "Near", y80: "Below" },
      C: { now: "Above", y20: "Near", y50: "Below", y80: "Below" },
    },
  },
  {
    id: "B",
    title: "Strategy B — Mixed-Structure Forest",
    subtitle: "Mixed species, multi-layer canopy, moderate selective harvest.",
    visual:
      "European beech mixed with drought-tolerant conifers, uneven canopy layers, habitat patches, some deadwood retained.",
    timber: { A: "Medium", B: "Medium", C: "Low" },
    carbon: { A: "Sink", B: "Sink", C: "Neutral" },
    biodiversity: { A: "Medium", B: "Medium", C: "Medium" },
    threshold: {
      A: { now: "Above", y20: "Above", y50: "Above", y80: "Near" },
      B: { now: "Above", y20: "Above", y50: "Near", y80: "Near" },
      C: { now: "Above", y20: "Near", y50: "Near", y80: "Below" },
    },
  },
  {
    id: "C",
    title: "Strategy C — Conservation-Heavy Stand",
    subtitle: "Old-growth broadleaves; minimal harvest; high moisture retention.",
    visual:
      "Older broadleaved forest, thick understory, abundant deadwood, protected zones, very limited extraction traces.",
    timber: { A: "Low", B: "Low", C: "Low" },
    carbon: { A: "Sink", B: "Sink", C: "Sink" },
    biodiversity: { A: "High", B: "High", C: "High" },
    threshold: {
      A: { now: "Above", y20: "Above", y50: "Above", y80: "Above" },
      B: { now: "Above", y20: "Above", y50: "Above", y80: "Above" },
      C: { now: "Above", y20: "Above", y50: "Above", y80: "Above" },
    },
  },
  {
    id: "D",
    title: "Strategy D — Monitoring & Adjustment",
    subtitle: "Monitoring stations + planned adjustments over time.",
    visual:
      "Active transition with monitoring stations (soil moisture, growth markers). Selective thinning; replanting oak/pine as conditions shift.",
    timber: { A: "High", B: "Medium", C: "Medium" },
    carbon: { A: "Sink", B: "Sink", C: "Neutral" },
    biodiversity: { A: "Medium", B: "Medium", C: "Medium" },
    threshold: {
      A: { now: "Above", y20: "Above", y50: "Above", y80: "Near" },
      B: { now: "Above", y20: "Above", y50: "Near", y80: "Near" },
      C: { now: "Above", y20: "Near", y50: "Near", y80: "Near" },
    },
  },
];

export const REASONS: { id: string; label: string }[] = [
  { id: "threshold", label: "Avoids crossing the resilience threshold" },
  { id: "stable", label: "Stays stable across futures" },
  { id: "no_extremes", label: "Performs well across futures without extremes" },
  { id: "income", label: "Maintains high income when possible" },
  { id: "adjust", label: "Can adjust as conditions change" },
  { id: "other", label: "Other / not sure" },
];