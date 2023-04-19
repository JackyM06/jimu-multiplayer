<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { ServiceConnect, ServiceAction } from '@multiplayer/jimu-editor/src/models/service'
import { Voice } from '@multiplayer/jimu-editor/src/models/voice'
import { HistoryManager } from '@editor/models/history';

onUnmounted(() => {
  ServiceConnect.disconnect()
})

function refresh() {
  location.reload()
}

</script>

<template>
  <div class="card">
    <div>
      <span class="name">当前用户: {{ ServiceConnect.username }}</span>
      <span class="total">连接数: {{ ServiceConnect.userTotals }}</span>
    </div>

    <div>
      <button type="button" @click="HistoryManager.redo">Redo</button>
      <button type="button" @click="HistoryManager.undo" >Undo</button>

      <template v-if="ServiceConnect.connected">
        <button class="connect" type="button" v-if="Voice.opened" @click="Voice.close">Voice: ON</button>
        <button type="button"  v-else @click="Voice.open">Voice: OFF</button>
      </template>
      
      <button class="connect" type="button" v-if="!ServiceConnect.connected" @click="ServiceConnect.connect">Connect</button>
      
      <button type="button" v-else @click="ServiceConnect.disconnect">Disconnect</button>



      <button type="button" @click="ServiceAction.saveSchema" >Save</button>
      <!-- <button type="button" @click="refresh">Refresh</button> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px;
    border-bottom: 2px solid #f8f1e0;

    .name {
        margin-right: 30px;
    }
}

button {
    margin-left: 20px;
    color: #fff;
    background-color: #020202;
}
</style>
