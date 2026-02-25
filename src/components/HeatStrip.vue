<script setup lang="ts">
import { computed } from "vue";
import type { FutureId } from "../data/futures";
import type { PlanId } from "../data/plans";
import { TIMES, computeResilience } from "../data/timeline";

const props = defineProps<{
  activeFutures: FutureId[];
  threshold?: number; // opcional si luego quieres controlarlo
}>();

const plans: { id: PlanId; label: string }[] = [
  { id: "A", label: "Strategy A" },
  { id: "B", label: "Strategy B" },
  { id: "C", label: "Strategy C" },
];

function clamp(x: number, a: number, b: number) {
  return Math.max(a, Math.min(b, x));
}

// Mapea R(t) a “intensidad” de verde (más alto = más “salud”).
// No uses colores fuertes: mejor sobrio (pero aquí lo hacemos simple).
function cellStyle(R: number, crossed: boolean) {
  // background: gris -> verde suave según R
  const g = Math.round(230 - (R * 80)); // 230..150
  const r = Math.round(245 - (R * 90)); // 245..155
  const b = Math.round(245 - (R * 110)); // 245..135
  const bg = `rgb(${clamp(r, 140, 245)},${clamp(g, 140, 245)},${clamp(b, 140, 245)})`;

  return {
    background: bg,
    border: crossed ? "2px solid #b00020" : "1px solid #e6e6e6",
  } as Record<string, string>;
}

const table = computed(() => {
  return plans.map((p) => {
    return TIMES.map((t) => {
      const { R, crossed } = computeResilience({
        activeFutures: props.activeFutures,
        planId: p.id,
        timeFactor: t.factor,
      });
      return { R, crossed, timeLabel: t.label, plan: p.id };
    });
  });
});
</script>

<template>
  <div class="strip">
    <div class="head">
      <div class="title">Threshold heat strip</div>
      <div class="sub">Cells show resilience index over time; red border = threshold crossed.</div>
    </div>

    <div class="grid">
      <div class="corner"></div>

      <div class="colh" v-for="t in TIMES" :key="t.id">
        {{ t.label }}
      </div>

      <template v-for="(row, i) in table" :key="plans[i].id">
        <div class="rowh">{{ plans[i].label }}</div>

        <div
          v-for="cell in row"
          :key="plans[i].id + '_' + cell.timeLabel"
          class="cell"
          :style="cellStyle(cell.R, cell.crossed)"
          :title="`Strategy ${plans[i].id} @ ${cell.timeLabel}: R=${cell.R.toFixed(2)}${cell.crossed ? ' (crossed)' : ''}`"
        >
          <span class="val">{{ cell.R.toFixed(2) }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.strip{border:1px solid #e6e6e6;border-radius:18px;background:#fff;padding:14px}
.head{display:flex;flex-direction:column;gap:4px;margin-bottom:10px}
.title{font-weight:700}
.sub{font-size:12px;color:#555}

.grid{
  display:grid;
  grid-template-columns: 160px repeat(4, 1fr);
  gap: 8px;
  align-items: stretch;
}
.corner{height:28px}
.colh{
  font-size:12px;color:#444;display:flex;align-items:center;justify-content:center;
  height:28px;background:#fafafa;border:1px solid #eee;border-radius:10px;
}
.rowh{
  font-size:12px;color:#444;display:flex;align-items:center;
  background:#fafafa;border:1px solid #eee;border-radius:10px;padding:0 10px;
  min-height:46px;
}
.cell{
  min-height:46px;border-radius:12px;
  display:flex;align-items:center;justify-content:center;
}
.val{font-size:12px;color:#111;opacity:0.85}
@media (max-width: 900px){
  .grid{grid-template-columns: 120px repeat(4, 1fr)}
}
</style>