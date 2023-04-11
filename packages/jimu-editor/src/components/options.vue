<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { ServiceConnect } from '@multiplayer/jimu-editor/src/models/service'

onUnmounted(() => {
  ServiceConnect.disconnect()
})

</script>

<template>
  <div class="card">
    <div>
      <span class="name">当前用户: {{ ServiceConnect.username }}</span>
      <span class="total">连接数: {{ ServiceConnect.userTotals }}</span>
    </div>

    <button class="connect" type="button" v-if="!ServiceConnect.connected" @click="ServiceConnect.connect">Connect</button>
    <button type="button" v-else @click="ServiceConnect.disconnect">Disconnect</button>

  </div>
</template>

<style lang="less" scoped>
.card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px;

    .name {
        margin-right: 30px;
    }
}

button {
    margin-left: 20px;
    filter: drop-shadow(0 0 1.5em #646cffaa);

    &.connect {
        filter: drop-shadow(0 0 1.5em #42b883aa);
    }
}
</style>
