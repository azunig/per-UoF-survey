<script setup lang="ts">

import { FUTURES, STRATEGIES, type FutureId } from "./data/vignette";
import StrategyCard from "./components/StrategyCard.vue";
import { computed, ref } from "vue";

const selectedStrategy = computed(() =>
  STRATEGIES.find(s => s.id === selectedStrategyId.value) ?? null
);
const showAllFutures = ref(true);
const selectedFuture = ref<FutureId>("A");
const selectedStrategyId = ref<string | null>(null);

function selectStrategy(id: string) {
  selectedStrategyId.value = id;
}

async function exportPayload() {
  const payload = {
    selectedFuture: selectedFuture.value,
    selectedStrategyId: selectedStrategyId.value,
    ts: new Date().toISOString(),
  };

  console.log("VIGNETTE_PAYLOAD", payload);

  try {
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    // Minimal confirmation without disrupting flow
    // (optional) you can remove this line if you prefer silent copy
    // alert("Copied to clipboard.");
  } catch {
    // fallback: do nothing
  }
}
</script>

<template>
  <div class="wrap">
    <div class="top">
      <h1 class="h">Forest Manager — Deep uncertainty</h1>
<p class="p">
  Deep uncertainty: experts cannot agree on probabilities for climate and economic shifts.
</p>
<p class="p p2">
  Under the three futures below (A–C), review four management strategies and compare outcomes over time.
</p>

      <!-- Header: 3-column layout (future selector / description / copy button) -->
      <div class="headerRow">
        <!-- Col 1: selector -->
        <div class="futureCol">
          <div class="lab">
  Futures (A–C): select one to view results
</div>
          <div class="btns">
            <button
              v-for="f in FUTURES"
              :key="f.id"
              class="btn"
              :class="{ active: selectedFuture === f.id }"
              type="button"
              @click="selectedFuture = f.id"
            >
              {{ f.icon }} {{ f.label }}
            </button>
          </div>
        </div>

        <!-- Col 2: description -->
        <div class="descCol">
          <div class="futureTitle">
            {{ FUTURES.find(f => f.id === selectedFuture)?.icon }}
            {{ FUTURES.find(f => f.id === selectedFuture)?.label }}
          </div>
          <div class="futureDesc">
            {{ FUTURES.find(f => f.id === selectedFuture)?.desc }}
          </div>
          <div class="selBox" v-if="selectedStrategy">
  <div class="selTitle">Selected strategy</div>
  <div class="selName">{{ selectedStrategy.title }}</div>
  <div class="selSub">{{ selectedStrategy.subtitle }}</div>
</div>
<div class="selBox muted" v-else>
  <div class="selTitle">Selected strategy</div>
  <div class="selSub">None selected yet.</div>
</div>
        </div>

        <!-- Col 3: copy button -->
        <div class="copyCol">
          <button class="copyBtn" type="button" @click="exportPayload" title="Copy response">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M16 4H18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"
              />
              <path
                d="M6 18H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div class="toggleRow">
  <label class="toggle">
    <input type="checkbox" v-model="showAllFutures" />
    <span>Show all futures</span>
  </label>
</div>
      </div>
    </div>

    <div class="grid">
      <div class="cards">
<StrategyCard
  v-for="s in STRATEGIES"
  :key="s.id"
  :strategy="s"
  :selected="selectedStrategyId === s.id"
  :selected-future="selectedFuture"
  :show-all-futures="showAllFutures"
  @select="selectStrategy"
/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap{
  max-width: 1180px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
  color:#111;
}
.top{
  border:1px solid #e6e6e6;
  background:#fff;
  border-radius:20px;
  padding:16px;
}
.h{ margin:0 0 6px; font-size:20px; text-align:center; }
.p{ margin:0; color:#333; font-size:13px; line-height:1.4; text-align:center; }

.grid{
  margin-top:14px;
  display:grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

/* 2x2 strategy layout */
.cards{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  align-items: start;
}
@media (max-width: 980px){
  .cards{ grid-template-columns: 1fr; }
}

/* Header 3 columns */
.headerRow{
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1.2fr 1.4fr auto;
  gap: 12px;
  align-items: start;
}
@media (max-width: 980px){
  .headerRow{
    grid-template-columns: 1fr;
  }
  .copyCol{ justify-content:flex-start; }
}

/* Col 1 */
.futureCol .lab{
  font-size:12px;
  color:#666;
  margin-bottom:8px;
  text-align:left;
}
.btns{ display:flex; gap:8px; flex-wrap:wrap; }
.btn{
  border:1px solid #ddd;
  background:#fff;
  color:#111;
  border-radius:999px;
  padding:8px 10px;
  cursor:pointer;
  font-size:13px;
}
.btn.active{ outline:2px solid #1112; border-color:#111; font-weight:600; }

/* Col 2 */
.descCol{
  border:1px solid #eee;
  border-radius:14px;
  padding:10px 12px;
  background:#fafafa;
}
.futureTitle{
  font-weight:600;
  font-size:13px;
  display:flex;
  gap:8px;
  align-items:center;
}
.futureDesc{
  margin-top:4px;
  font-size:12px;
  color:#555;
  line-height:1.35;
}

/* Col 3 */
.copyCol{
  display:flex;
  justify-content:flex-end;
}
.copyBtn{
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid #111;
  background: #111;
  color: #fff;
  cursor: pointer;
  display:flex;
  align-items:center;
  justify-content:center;
}
.toggleRow{ margin-top:10px; }
.toggle{ display:flex; gap:10px; align-items:center; font-size:12px; color:#444; }
.toggle input{ width:16px; height:16px; }
.p2{ margin-top:6px; }
.selBox{
  margin-top:10px;
  border:1px solid #eee;
  border-radius:14px;
  padding:10px 12px;
  background:#fff;
}
.selBox.muted{ background:#fafafa; }
.selTitle{ font-size:11px; color:#666; margin-bottom:6px; }
.selName{ font-size:12px; font-weight:600; color:#111; line-height:1.25; }
.selSub{ margin-top:4px; font-size:12px; color:#555; line-height:1.35; }
</style>