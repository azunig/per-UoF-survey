<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { FutureId } from "../data/futures";
import { FUTURES } from "../data/futures";
import type { PlanId } from "../data/plans";
import { PLANS } from "../data/plans";

import DriverButtons from "./DriverButtons.vue";
import PlanCards from "./PlanCards.vue";
import TimeSelector from "./TimeSelector.vue";
import ForestScene from "./ForestScene.vue";

import HeatStrip from "./HeatStrip.vue";

import { computeChannels } from "../data/timeline";



const ch = computed(() =>
  computeChannels({
    activeFutures: activeFutures.value,
    planId: selectedPlanId.value,
    timeFactor: timeFactor.value,
  })
);

import { nowMs } from "../utils/analytics";

const revealLimit = 2;
const activeFutures = ref<FutureId[]>(["hot_dry"]);
const timeFactor = ref(1.0);
const selectedPlanId = ref<PlanId | null>(null);

const timeOptions = [
  { label: "Now", factor: 0.0 },
  { label: "1 month", factor: 0.25 },
  { label: "6 months", factor: 0.6 },
  { label: "1 year", factor: 1.0 },
];

const interactionCount = ref(0);
const t0 = ref(0);

onMounted(() => (t0.value = nowMs()));

function toggleFuture(id: string) {
  console.log("TOGGLE CLICK:", id);

  const idx = activeFutures.value.indexOf(id as any);
  if (idx >= 0) {
    activeFutures.value.splice(idx, 1);
    return;
  }
  if (activeFutures.value.length >= revealLimit) return;
  activeFutures.value.push(id as any);
}

function selectPlan(id: string) {
  selectedPlanId.value = id as PlanId;
  interactionCount.value += 1;
}

const impact = computed(() =>
  computeChannels({
    activeFutures: activeFutures.value,
    planId: selectedPlanId.value,
    timeFactor: timeFactor.value,
  })
);
</script>

<template>
  <div class="wrap">
    <div class="panel">
      <h2 class="h">Scenario reflection</h2>
      <p class="p">Select a plan and see how the forest evolves over time under the futures you reveal.</p>

      <div class="row">
<DriverButtons
  :futures="FUTURES"
  :active-ids="activeFutures"
  :reveal-limit="revealLimit"
  @toggle="toggleFuture"
/>
      </div>
<div style="font-size:12px;color:#666;margin-top:8px;">

</div>
      <div class="row">
        <TimeSelector v-model="timeFactor" :options="timeOptions" />
      </div>

      <div class="row">
        <ForestScene :ch="ch" />
        <HeatStrip :active-futures="activeFutures" />
      </div>
<pre class="debug">
activeFutures: {{ activeFutures }}
selectedPlanId: {{ selectedPlanId }}
timeFactor: {{ timeFactor }}
channels: {{ ch }}
</pre>
      <div class="divider"></div>

    <!--   <PlanCards :plans="PLANS" :selected-plan-id="selectedPlanId" @select="selectPlan" />
     --></div>
  </div>
</template>

<style scoped>
.wrap{max-width:1100px;margin:0 auto;padding:22px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial}
.panel{background:#fff;border:1px solid #e6e6e6;border-radius:18px;padding:18px}
.h{margin:0 0 6px}
.p{margin:0 0 14px;color:#333}
.row{margin:12px 0}
.divider{height:1px;background:#eee;margin:16px 0}
.debug{
  margin-top: 10px;
  font-size: 12px;
  color: #666;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 10px;
  white-space: pre-wrap;
}
</style>