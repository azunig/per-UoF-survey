<script setup lang="ts">
import type { Plan } from "../data/plans";

const props = defineProps<{
  plan: Plan;
  selected: boolean;
}>();

const emit = defineEmits<{
  (e: "select", id: string): void;
}>();
</script>

<template>
  <button class="card" :class="{ selected }" type="button" @click="emit('select', plan.id)">
    <div class="top">
      <div class="title">{{ plan.title }}</div>
      <div class="pill" v-if="selected">Selected</div>
    </div>

    <div class="tagline">{{ plan.tagline }}</div>

    <div class="cta">
      <span class="hint">Click to select</span>
    </div>
  </button>
</template>

<style scoped>
.card{
  border:1px solid #e6e6e6;
  border-radius:16px;
  padding:14px;
  background:#fff;
  text-align:left;
  cursor:pointer;
  width:100%;
  transition: transform 120ms ease, box-shadow 120ms ease;
}
.card:hover{ transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,0.06); }
.card.selected{ outline: 2px solid #111; border-color: transparent; }

.top{ display:flex; align-items:center; justify-content:space-between; gap:10px; }
.title{ font-weight: 700; font-size: 16px; }
.pill{
  font-size: 12px;
  border:1px solid #ddd;
  border-radius:999px;
  padding:4px 8px;
  background:#fff;
}
.tagline{ margin-top: 8px; color:#444; font-size: 13px; line-height: 1.35; }
.cta{ margin-top: 12px; display:flex; justify-content:flex-end; }
.hint{ font-size: 12px; color:#666; }
</style>