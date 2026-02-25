<script setup lang="ts">
type TimeOpt = { label: string; factor: number };

const props = defineProps<{
  modelValue: number;          // timeFactor
  options: TimeOpt[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: number): void;
}>();

function select(v: number) {
  emit("update:modelValue", v);
}

function isActive(v: number) {
  return Math.abs(props.modelValue - v) < 1e-9;
}
</script>

<template>
  <div class="time">
    <div class="label">Time</div>
    <div class="btns">
      <button
        v-for="o in options"
        :key="o.label"
        type="button"
        class="btn"
        :class="{ active: isActive(o.factor) }"
        @click="select(o.factor)"
      >
        {{ o.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.time{display:flex;align-items:center;justify-content:space-between;gap:12px}
.label{font-size:12px;color:#444}
.btns{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
.btn{
  border:1px solid #ddd;background:#fff;color:#111;
  padding:8px 10px;border-radius:999px;cursor:pointer;font-size:13px
}
.btn.active{border-color:#111; outline:2px solid #1112; font-weight:600}
</style>