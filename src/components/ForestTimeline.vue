<script setup lang="ts">
import ForestScene from "./ForestScene.vue";
import { TIMES, computeImpact } from "../data/timeline";
import type { FutureId } from "../data/futures";
import type { PlanId } from "../data/plans";

const props = defineProps<{ activeFutures: FutureId[]; planId: PlanId | null }>();
</script>

<template>
  <div class="timeline">
    <ForestScene
      v-for="t in TIMES"
      :key="t.id"
      :label="t.label"
      :impact="computeImpact({ activeFutures: props.activeFutures, planId: props.planId, timeFactor: t.factor })"
    />
  </div>
</template>

<style scoped>
.timeline{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media (min-width: 1000px){.timeline{grid-template-columns:1fr 1fr 1fr 1fr}}
</style>