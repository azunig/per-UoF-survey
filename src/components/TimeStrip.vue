<script setup lang="ts">
import type { Threshold, TimeId } from "../data/vignette";

defineProps<{
  times: { id: TimeId; label: string }[];
  values: Record<TimeId, Threshold>;
}>();

function cls(v: Threshold) {
  return v === "Above" ? "above" : v === "Near" ? "near" : "below";
}
</script>

<template>
  <div class="strip">
    <div class="t" v-for="t in times" :key="t.id">
      <div class="lab">{{ t.label }}</div>
      <div class="cell" :class="cls(values[t.id])">
        {{ values[t.id] }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.strip{ display:grid; grid-template-columns: repeat(4, 1fr); gap:8px; }
.t{ display:flex; flex-direction:column; gap:6px; }
.lab{ font-size:11px; color:#666; text-align:center; }
.cell{
  border-radius:12px;
  border:1px solid #e6e6e6;
  padding:8px 10px;
  font-size:12px;
  text-align:center;
  background:#fff;
}
.above{ background:#84d442; }
.near{ background:#f0b637; }
.below{ background:#af2a2a; border-color:#d24b4b; }
</style>