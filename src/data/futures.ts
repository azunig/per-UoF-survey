export type FutureId = "hot_dry" | "pests" | "market" | "benign";

export type Future = {
  id: FutureId;
  label: string;
  icon: string;
  hint: string;
};

export const FUTURES: Future[] = [
  { id: "hot_dry", label: "Hotter / Drier", icon: "☀️", hint: "Lower water availability" },
  { id: "pests", label: "Pests / Disturbance", icon: "🐛", hint: "Higher disturbance pressure" },
  { id: "market", label: "Market Volatility", icon: "📉", hint: "Unstable demand & prices" },
  { id: "benign", label: "Benign / Stable", icon: "🌿", hint: "Favorable growing conditions" },
];