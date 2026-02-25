<script setup lang="ts">
import type { Strategy, FutureId } from "../data/vignette";
import { FUTURES, TIMES } from "../data/vignette";
import Badge from "./Badge.vue";
import TimeStrip from "./TimeStrip.vue";

defineProps<{
  strategy: Strategy;
  selected: boolean;
  selectedFuture: FutureId;
  showAllFutures: boolean; // true = show A/B/C with highlight; false = show only selected future
}>();

const emit = defineEmits<{ (e: "select", id: string): void }>();
</script>

<template>
  
  <button class="card" :class="{ selected }" type="button" @click="emit('select', strategy.id)">

    <div class="head">
      <div class="title">
        <div class="code">Strategy {{ strategy.id }} - {{ FUTURES.find(f => f.id === selectedFuture)?.label }}</div>
        {{ strategy.title }}
      </div>
      <Badge v-if="selected" text="Selected" />
    </div>

    <div class="sub">{{ strategy.subtitle }}</div>

    <details class="visual" open>
      <summary class="visualTitle">Visual description</summary>
      <div class="visualText">{{ strategy.visual }}</div>
    </details>

    <div class="dash">
      <div class="dashTitle">
       Data dashboard <!-- (Scenario {{ FUTURES.find(f => f.id === selectedFuture)?.label }}) -->
      </div>

      <div class="grid">
        <div class="k">Timber income</div>
        <div class="v">
          <template v-if="showAllFutures">
            <span class="fv" :class="{ sel: selectedFuture === 'A' }">A: {{ strategy.timber.A }}</span>
            <span class="fv" :class="{ sel: selectedFuture === 'B' }">B: {{ strategy.timber.B }}</span>
            <span class="fv" :class="{ sel: selectedFuture === 'C' }">C: {{ strategy.timber.C }}</span>
          </template>
          <template v-else>
            <span class="fv sel">{{ strategy.timber[selectedFuture] }}</span>
          </template>
        </div>

        <div class="k">Carbon balance</div>
        <div class="v">
          <template v-if="showAllFutures">
            <span class="fv" :class="{ sel: selectedFuture === 'A' }">A: {{ strategy.carbon.A }}</span>
            <span class="fv" :class="{ sel: selectedFuture === 'B' }">B: {{ strategy.carbon.B }}</span>
            <span class="fv" :class="{ sel: selectedFuture === 'C' }">C: {{ strategy.carbon.C }}</span>
          </template>
          <template v-else>
            <span class="fv sel"> {{ strategy.carbon[selectedFuture] }}</span>
          </template>
        </div>

        <div class="k">Biodiversity</div>
        <div class="v">
          <template v-if="showAllFutures">
            <span class="fv" :class="{ sel: selectedFuture === 'A' }">A: {{ strategy.biodiversity.A }}</span>
            <span class="fv" :class="{ sel: selectedFuture === 'B' }">B: {{ strategy.biodiversity.B }}</span>
            <span class="fv" :class="{ sel: selectedFuture === 'C' }">C: {{ strategy.biodiversity.C }}</span>
          </template>
          <template v-else>
            <span class="fv sel"> {{ strategy.biodiversity[selectedFuture] }}</span>
          </template>
        </div>
      </div>

      <div class="th">
        <div class="dashTitle">
          Resilience threshold over time <!-- — {{ FUTURES.find(f => f.id === selectedFuture)?.label }} -->
        </div>
        <TimeStrip :times="TIMES" :values="strategy.threshold[selectedFuture]" />
      </div>
    </div>

    <div class="hint">Click to select</div>
  </button>
</template>

<style scoped>
.selBar{
  position:absolute;
  left:0; top:0; bottom:0;
  width:6px;
  background:#111;
  border-top-left-radius:18px;
  border-bottom-left-radius:18px;
}
.card{ position:relative; } /* asegúrate de tener esto */
.card{
  width:100%;
  text-align:left;
  border:1px solid #e6e6e6;
  background:#fff;
  border-radius:18px;
  padding:14px;
  cursor:pointer;
  transition: transform 120ms ease, box-shadow 120ms ease;
}
.card:hover{ transform: translateY(-1px); box-shadow: 0 8px 22px rgba(0,0,0,0.06); }
.card.selected{
  border-color: #111;
  background: #f7f7ff;          /* suave pero evidente */
  box-shadow: 0 10px 26px rgba(0,0,0,0.08);
}
.head{ display:flex; align-items:flex-start; justify-content:space-between; gap:10px; }
.title{ font-weight:700; font-size:15px; line-height:1.2; }
.code{ font-size:12px; color:#666; margin-bottom:4px; font-weight:600; }
.sub{ margin-top:6px; color:#444; font-size:13px; }

.visualTitle{
  font-size:12px;
  color:#666;
  cursor:pointer;
  user-select:none;
}
.visualText{ margin-top:6px; font-size:13px; color:#333; line-height:1.35; }
.visual{ margin-top:12px; border:1px solid #eee; border-radius:14px; padding:10px; background:#fafafa; }

.dash{ margin-top:12px; }
.dashTitle{ font-size:12px; color:#666; margin:6px 0; }

.grid{
  display:grid;
  grid-template-columns: 140px 1fr;
  gap:8px 10px;
  border:1px solid #eee;
  border-radius:14px;
  padding:10px;
}
.k{ font-size:12px; color:#555; }

.v{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
  align-items:center;
}
.fv{
  font-size:12px;
  border:1px solid #eee;
  background:#fafafa;
  border-radius:999px;
  padding:3px 8px;
  color:#333;
}
.fv.sel{
  border-color:#111;
  background:#fff;
  outline:2px solid #1112;
  font-weight:600;
}

.th{ margin-top:10px; border:1px solid #eee; border-radius:14px; padding:10px; }

.hint{ margin-top:10px; font-size:12px; color:#666; text-align:right; }
</style>