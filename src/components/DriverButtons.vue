<script setup lang="ts">
import type { Future } from "../data/futures";

const props = defineProps<{
  futures: Future[];
  activeIds: string[];
  revealLimit: number;
}>();

const emit = defineEmits<{ (e: "toggle", id: string): void }>();

function isActive(id: string) { return props.activeIds.includes(id); }
function disabled(id: string) {
  return props.activeIds.length >= props.revealLimit && !isActive(id);
}
</script>

<template>
  <div class="wrap">
    <button
      v-for="f in futures"
      :key="f.id"
      class="chip"
      :class="{ active: isActive(f.id) }"
      type="button"
      :disabled="disabled(f.id)"
      @click="emit('toggle', f.id)"
    >
      <span class="ic">{{ f.icon }}</span>
      <span class="tx">{{ f.label }}</span>
    </button>

    <div class="meta">Selected futures: {{ activeIds.length }} / {{ revealLimit }}</div>
  </div>
</template>

<style scoped>
.wrap{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.chip{
  border:1px solid #ddd;border-radius:999px;
  padding:10px 14px;background:#fff;
  cursor:pointer;font-size:13px;
  display:flex;gap:10px;align-items:center;
  min-width: 160px;
}
.chip.active{border-color:#111; outline:2px solid #1112}
.chip:disabled{opacity:.5;cursor:not-allowed}
.meta{font-size:12px;color:#666;margin-left:auto}
.ic{font-size:16px}
.tx{white-space:nowrap}
</style>