<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template><span class="b">{{ text }}</span></template>

<style scoped>
.b{
  border:1px solid #e6e6e6;
  background:#fafafa;
  border-radius:10px;
  padding:4px 8px;
  font-size:12px;
  color:#333;
}
</style>