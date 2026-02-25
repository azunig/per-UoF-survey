<script setup lang="ts">
import { REASONS } from "../data/vignette";

defineProps<{
  selectedStrategyId: string | null;
  reasonId: string | null;
  definition: string;
}>();

const emit = defineEmits<{
  (e: "update:reasonId", v: string): void;
  (e: "update:definition", v: string): void;
}>();
</script>

<template>
  <div class="panel">
    <div class="q">
      <div class="qt">Q1</div>
      <div class="qb">
        Based on what you see, which strategy represents the most robust decision for resilience under deep uncertainty?
      </div>
      <div class="ans">
        Selected: <b>{{ selectedStrategyId ?? "—" }}</b>
      </div>
    </div>

    <div class="q">
      <div class="qt">Q2</div>
      <div class="qb">Your main reason is:</div>

      <div class="opts">
        <label v-for="r in REASONS" :key="r.id" class="opt">
          <input
            type="radio"
            name="reason"
            :value="r.id"
            :checked="reasonId === r.id"
            @change="emit('update:reasonId', r.id)"
          />
          <span>{{ r.label }}</span>
        </label>
      </div>
    </div>

    <div class="q">
      <div class="qt">Q3 (optional)</div>
      <div class="qb">In one sentence, what does “robust for resilience” mean to you here?</div>
      <input
        class="txt"
        type="text"
        :value="definition"
        placeholder="One sentence..."
        @input="emit('update:definition', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<style scoped>
.panel{ border:1px solid #e6e6e6; background:#fff; border-radius:18px; padding:14px; }
.q{ margin-bottom:14px; }
.qt{ font-size:11px; color:#666; margin-bottom:4px; }
.qb{ font-size:13px; color:#111; line-height:1.35; }
.ans{ margin-top:6px; font-size:12px; color:#444; }

.opts{ margin-top:10px; display:grid; gap:8px; }
.opt{ display:flex; gap:10px; align-items:flex-start; font-size:13px; color:#222; }
.opt input{ margin-top:2px; }

.txt{
  margin-top:10px;
  width:100%;
  border:1px solid #ddd;
  border-radius:12px;
  padding:10px 12px;
  font-size:13px;
}
.side{
  position: sticky;
  top: 14px;
  align-self: start;
}
</style>