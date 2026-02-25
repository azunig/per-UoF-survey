<script setup lang="ts">
import PlanCard from "./PlanCard.vue";
import type { Plan } from "../data/plans";

defineProps<{
  plans: Plan[];
  selectedPlanId: string | null;
}>();

const emit = defineEmits<{
  (e: "select", id: string): void;
}>();
</script>

<template>
  <div class="cards">
    <PlanCard
      v-for="p in plans"
      :key="p.id"
      :plan="p"
      :selected="selectedPlanId === p.id"
      @select="(id) => emit('select', id)"
    />
  </div>
</template>

<style scoped>
.cards{ display:grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 900px){ .cards{ grid-template-columns: 1fr 1fr 1fr; } }
</style>