<template>
  <div class="pk" role="status" aria-live="polite" aria-label="Loading page">
    <div class="pk-hero">
      <div class="pk-wrap">
        <span class="pk-b pk-pill"></span>
        <span class="pk-b pk-h1"></span>
        <span class="pk-b pk-h1 pk-h1-s"></span>
        <span class="pk-b pk-line"></span>
        <span class="pk-b pk-line pk-line-s"></span>
        <div class="pk-row">
          <span class="pk-b pk-btn"></span>
          <span class="pk-b pk-btn pk-btn-o"></span>
        </div>
      </div>
    </div>
    <div class="pk-wrap pk-body">
      <span class="pk-b pk-h2"></span>
      <div class="pk-grid">
        <div v-for="n in 6" :key="n" class="pk-card">
          <span class="pk-b pk-img"></span>
          <span class="pk-b pk-line"></span>
          <span class="pk-b pk-line pk-line-s"></span>
        </div>
      </div>
    </div>
    <span class="pk-sr">Loading…</span>
  </div>
</template>
