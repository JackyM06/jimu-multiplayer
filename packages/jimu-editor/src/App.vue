<script setup lang="ts">
import Options from './components/options.vue'
import Warper from './components/warper.vue'
import Control from './components/control.vue'
import Market from './components/market.vue'
import Logger from './components/logger.vue'
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
  <div class="footer">
    <Logger></Logger>
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

.footer {
    border-top: 2px solid #f8f1e0;
}
</style>
