<script setup lang="ts">
import Options from './components/options.vue'
import Warper from './components/warper.vue'
import Control from './components/control.vue'
import Market from './components/market.vue'
</script>

<template>
  <div>
    <Options/>
  </div>
  <div class="main-panel">
    <Market/>
    <Warper class="warper"/>
    <Control/>
  </div>
</template>

<style scoped lang="less">
.logo {
    height: 6em;
    padding: 1.5em;
    transition: filter 300ms;
    will-change: filter;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}

.main-panel {
    display: flex;
    .warper {
        flex: 1;
        min-width: 800px;
    }
}
</style>
