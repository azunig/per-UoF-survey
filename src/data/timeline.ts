import type { FutureId } from "./futures";
import type { PlanId } from "./plans";


/* export function computeResilience(params: {
  activeFutures: FutureId[];
  planId: PlanId;
  timeFactor: number; // 0..1
}) {
  const ch = computeChannels({ ...params, planId: params.planId });

  // Resilience index (0..1)
  // baja con dryness/pests, market solo agrega incertidumbre visual (poco efecto)
  let R = 1.0
    - 0.55 * ch.dryness
    - 0.45 * ch.pests
    - 0.10 * ch.market
    + 0.35 * ch.benign;

  // clamp
  R = Math.max(0, Math.min(1, R));

  const T = 0.6; // threshold fijo para demo
  return { R, T, crossed: R < T, ch };
} */

export type Channels = {
  dryness: number;
  pests: number;
  market: number;
  benign: number;
};

export type TimeOpt = { id: "now" | "m1" | "m6" | "y1"; label: string; factor: number };

/**
 * Para demo: "Now" no debe ser 0, si no no se ve ningún cambio y la gente cree que está roto.
 * Para encuesta real, puedes volverlo a 0 si quieres baseline puro.
 */
export const TIMES: TimeOpt[] = [
  { id: "now", label: "Now", factor: 0.1 },
  { id: "m1", label: "1 month", factor: 0.25 },
  { id: "m6", label: "6 months", factor: 0.6 },
  { id: "y1", label: "1 year", factor: 1.0 },
];

function clamp(x: number, a: number, b: number) {
  return Math.max(a, Math.min(b, x));
}

/**
 * DRIVER_BASE define "qué tipo de impacto" aporta cada futuro.
 * - hot_dry: sequía fuerte + algo de estrés que puede aumentar plagas
 * - pests: plagas directo + un poco de sequía indirecta
 * - market: NO daño biofísico; lo usas como "ruido/estrés" visual
 * - benign: recuperación/verdor (compensa)
 */
const DRIVER_BASE: Record<FutureId, Channels> = {
  hot_dry: { dryness: 1.0, pests: 0.2, market: 0.0, benign: 0.0 },
  pests:   { dryness: 0.1, pests: 1.0, market: 0.0, benign: 0.0 },
  market:  { dryness: 0.0, pests: 0.0, market: 1.0, benign: 0.0 },
  benign:  { dryness: 0.0, pests: 0.0, market: 0.0, benign: 1.0 },
};

/**
 * PLAN_SENS define cómo cada plan amortigua o amplifica cada canal.
 * B amortigua más (balanceado), A es más variable, C es estable (especialmente ante sequía).
 */
const PLAN_SENS: Record<PlanId, Channels> = {
  A: { dryness: 1.15, pests: 1.0,  market: 1.1,  benign: 1.0 },
  B: { dryness: 0.75, pests: 0.75, market: 0.75, benign: 0.9 },
  C: { dryness: 0.65, pests: 0.95, market: 0.85, benign: 0.85 },
};

export function computeChannels(params: {
  activeFutures: FutureId[];
  planId: PlanId | null;
  timeFactor: number; // 0..1
}): Channels {
  const { activeFutures, planId, timeFactor } = params;

  if (!planId || activeFutures.length === 0) {
    return { dryness: 0, pests: 0, market: 0, benign: 0 };
  }

  // crecimiento temporal (suave, no lineal)
  const growth = Math.pow(timeFactor, 1.1);

  let dryness = 0, pests = 0, market = 0, benign = 0;

  for (const f of activeFutures) {
    dryness += DRIVER_BASE[f].dryness;
    pests   += DRIVER_BASE[f].pests;
    market  += DRIVER_BASE[f].market;
    benign  += DRIVER_BASE[f].benign;
  }

  dryness *= PLAN_SENS[planId].dryness;
  pests   *= PLAN_SENS[planId].pests;
  market  *= PLAN_SENS[planId].market;
  benign  *= PLAN_SENS[planId].benign;

  return {
    dryness: clamp(dryness * growth * 0.85, 0, 1),
    pests:   clamp(pests   * growth * 0.85, 0, 1),
    market:  clamp(market  * growth * 0.85, 0, 1),
    benign:  clamp(benign  * growth * 0.85, 0, 1),
  };
}

export function computeResilience(params: {
  activeFutures: FutureId[];
  planId: PlanId;
  timeFactor: number;
}) {
  const ch = computeChannels({
    activeFutures: params.activeFutures,
    planId: params.planId,
    timeFactor: params.timeFactor,
  });

  // Resilience index R(t) (0..1): cae con dryness/pests, market afecta poco (estrés), benign compensa.
  let R =
    1.0
    - 0.55 * ch.dryness
    - 0.45 * ch.pests
    - 0.10 * ch.market
    + 0.35 * ch.benign;

  R = Math.max(0, Math.min(1, R));

  const T = 0.6; // threshold fijo para demo (puedes hacerlo configurable)
  return { R, T, crossed: R < T, ch };
}