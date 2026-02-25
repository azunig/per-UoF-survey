<script setup lang="ts">
import { computed, toRef } from "vue";
import type { Channels } from "../data/timeline";

const props = defineProps<{ ch: Channels }>();
const chRef = toRef(props, "ch");

function clamp(x: number, a: number, b: number) {
  return Math.max(a, Math.min(b, x));
}

const d = computed(() => clamp(chRef.value?.dryness ?? 0, 0, 1));
const p = computed(() => clamp(chRef.value?.pests ?? 0, 0, 1));
const m = computed(() => clamp(chRef.value?.market ?? 0, 0, 1));
const b = computed(() => clamp(chRef.value?.benign ?? 0, 0, 1));

// benign compensa un poco sequía/plaga visualmente (sin “magia”)
const dEff = computed(() => clamp(d.value * (1 - 0.35 * b.value), 0, 1));
const pEff = computed(() => clamp(p.value * (1 - 0.25 * b.value), 0, 1));

const haze = computed(() => clamp(0.18 * m.value + 0.22 * dEff.value, 0, 0.45));
const dryness = computed(() => dEff.value);
const pest = computed(() => pEff.value);
const lush = computed(() => clamp(0.55 * b.value, 0, 0.55));

const sky = computed(() => `rgba(233,238,246,${1 - haze.value})`);
const ground = computed(() => `rgb(${223 + dryness.value * 18},${232 - dryness.value * 55 + lush.value * 25},${214 - dryness.value * 60 + lush.value * 10})`);
const hill = computed(() => `rgb(${207 + dryness.value * 18},${224 - dryness.value * 60 + lush.value * 25},${197 - dryness.value * 40 + lush.value * 10})`);

function canopyColor(baseR: number, baseG: number, baseB: number) {
  const r = baseR + dryness.value * 75;
  const g = baseG - dryness.value * 95 + lush.value * 45;
  const b2 = baseB - dryness.value * 35 + lush.value * 15;
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b2)})`;
}
</script>
<template>
  <div class="scene">
    <svg viewBox="0 0 1100 420" class="svg" role="img" aria-label="Forest evolution">
      <rect x="0" y="0" width="1100" height="260" :fill="sky" class="t" />
      <rect x="0" y="260" width="1100" height="160" :fill="ground" class="t" />

      <path d="M0,290 C220,150 420,340 650,250 C820,180 980,290 1100,220 L1100,420 L0,420 Z"
            :fill="hill" class="t" />

      <!-- trees -->
      <g class="t">
        <g>
          <circle cx="180" cy="230" r="38" :fill="canopyColor(90,143,85)" />
          <rect x="172" y="230" width="16" height="70" fill="#7b5a3a" />
        </g>
        <g>
          <circle cx="360" cy="215" r="46" :fill="canopyColor(78,132,80)" />
          <rect x="351" y="215" width="18" height="90" fill="#7b5a3a" />
        </g>
        <g>
          <circle cx="560" cy="235" r="42" :fill="canopyColor(90,143,85)" />
          <rect x="552" y="235" width="18" height="78" fill="#7b5a3a" />
        </g>
        <g>
          <circle cx="760" cy="210" r="52" :fill="canopyColor(78,132,80)" />
          <rect x="751" y="210" width="18" height="100" fill="#7b5a3a" />
        </g>
        <g>
          <circle cx="950" cy="240" r="38" :fill="canopyColor(90,143,85)" />
          <rect x="942" y="240" width="16" height="70" fill="#7b5a3a" />
        </g>
      </g>

      <!-- haze overlay -->
      <rect x="0" y="0" width="1100" height="420"
            :fill="`rgba(120,120,120,${haze})`" class="t" />

      <!-- pest speckles -->
      <g :opacity="pest" class="t">
        <circle cx="340" cy="210" r="6" fill="rgba(70,50,30,0.55)"/>
        <circle cx="780" cy="205" r="6" fill="rgba(70,50,30,0.55)"/>
        <circle cx="560" cy="235" r="6" fill="rgba(70,50,30,0.55)"/>
        <circle cx="950" cy="240" r="6" fill="rgba(70,50,30,0.55)"/>
        <circle cx="180" cy="230" r="6" fill="rgba(70,50,30,0.55)"/>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.scene{
  border:1px solid #e6e6e6;
  border-radius:16px;
  overflow:hidden;
  background:#fff;
}
.svg{width:100%;display:block}
.t{transition: all 320ms ease;}
</style>