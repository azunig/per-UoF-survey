<script setup lang="ts">
import ForestScene from "./ForestScene.vue";
import { computeChannels } from "../data/timeline";
import type { FutureId } from "../data/futures";
import type { PlanId } from "../data/plans";

const props = defineProps<{
  activeFutures: FutureId[];
  timeFactor: number;
}>();

const plans: { id: PlanId; title: string; subtitle: string }[] = [
  { id: "A", title: "Strategy A", subtitle: "More variable / higher upside" },
  { id: "B", title: "Strategy B", subtitle: "Balanced across futures" },
  { id: "C", title: "Strategy C", subtitle: "More stable / fewer surprises" },
];
</script>

<template>
  <div class="grid">
    <div class="card" v-for="p in plans" :key="p.id">
      <div class="head">
        <div class="t">{{ p.title }}</div>
        <div class="s">{{ p.subtitle }}</div>
      </div>

      <ForestScene
        :ch="computeChannels({ activeFutures: props.activeFutures, planId: p.id, timeFactor: props.timeFactor })"
      />
    </div>
  </div>
</template>

<style scoped>
.grid{display:grid;grid-template-columns:1fr;gap:14px}
@media (min-width: 1000px){.grid{grid-template-columns:1fr 1fr 1fr}}
.card{border:1px solid #e6e6e6;border-radius:18px;background:#fff;padding:12px}
.head{margin-bottom:10px}
.t{font-weight:700}
.s{font-size:12px;color:#555;margin-top:2px}
</style>