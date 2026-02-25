<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  icon: string;
  hint: string;
  revealed: boolean;
  disabled: boolean;
}>();

const emit = defineEmits<{ (e: "reveal", id: string): void }>();

const classes = computed(() => ({
  tile: true,
  revealed: props.revealed,
  disabled: props.disabled && !props.revealed,
}));

function onClick() {
  if (props.disabled && !props.revealed) return;
  if (!props.revealed) emit("reveal", props.id);
}
</script>

<template>
  <button :class="classes" @click="onClick" type="button" :aria-label="label">
    <div class="top">
      <span class="icon">{{ icon }}</span>
      <span class="label">{{ label }}</span>
    </div>

    <div class="body">
      <div v-if="!revealed" class="fog">
        <span class="fogText">Click to reveal</span>
      </div>
      <div v-else class="content">
        <div class="hint">{{ hint }}</div>
      </div>
    </div>
  </button>
</template>

<style scoped>
.tile{width:100%;border:1px solid #ddd;border-radius:12px;padding:12px;background:#fff;text-align:left;cursor:pointer;transition:transform 120ms ease}
.tile:hover{transform:translateY(-1px)}
.tile.disabled{opacity:.5;cursor:not-allowed}
.top{display:flex;gap:10px;align-items:center}
.icon{font-size:20px}
.label{font-weight:600}
.body{margin-top:10px;min-height:70px;position:relative}
.fog{height:70px;border-radius:10px;background:repeating-linear-gradient(45deg,rgba(200,200,200,.5),rgba(200,200,200,.5) 10px,rgba(220,220,220,.5) 10px,rgba(220,220,220,.5) 20px);display:flex;align-items:center;justify-content:center}
.fogText{font-size:12px;color:#333;background:rgba(255,255,255,.75);padding:4px 8px;border-radius:999px}
.hint{font-size:13px;color:#333}
</style>