<script setup lang="ts">
defineProps<{ items: { icon: string; label: string }[] }>();
</script>

<template>
  <div class="pills">
    <span v-for="it in items" :key="it.label" class="pill">
      <span class="ic">{{ it.icon }}</span>
      <span class="tx">{{ it.label }}</span>
    </span>
  </div>
</template>

<style scoped>
.pills { display:flex; gap:8px; flex-wrap:wrap; }
.pill{
  border:1px solid #e6e6e6; background:#fff;
  border-radius:999px; padding:6px 10px;
  display:flex; gap:8px; align-items:center;
  font-size:12px; color:#333;
}
.ic{ font-size:14px; }
.tx{ white-space:nowrap; }
</style>