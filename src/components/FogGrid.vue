<script setup lang="ts">
import FogTile from "./FogTile.vue";
import type { Future } from "../data/futures";

const props = defineProps<{
  futures: Future[];
  revealedIds: string[];
  revealLimit: number;
}>();

const emit = defineEmits<{ (e: "reveal", id: string): void }>();

function isRevealed(id: string) {
  return props.revealedIds.includes(id);
}

function isDisabled(id: string) {
  return props.revealedIds.length >= props.revealLimit && !isRevealed(id);
}
</script>

<template>
  <div class="grid">
    <FogTile
      v-for="f in futures"
      :key="f.id"
      :id="f.id"
      :label="f.label"
      :icon="f.icon"
      :hint="f.hint"
      :revealed="isRevealed(f.id)"
      :disabled="isDisabled(f.id)"
      @reveal="(id) => emit('reveal', id)"
    />
  </div>
  <div class="note">Revealed: {{ revealedIds.length }} / {{ revealLimit }}</div>
</template>

<style scoped>
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.note{margin-top:8px;font-size:12px;color:#444}
</style>