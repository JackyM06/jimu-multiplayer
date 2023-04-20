<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { ServiceConnect, ServiceAction } from '@multiplayer/jimu-editor/src/models/service'
import { Voice } from '@multiplayer/jimu-editor/src/models/voice'
import { HistoryManager } from '@editor/models/history';
import EditDialog from '@editor/components/edit-dialog.vue'
import { IUserInfo } from '@multiplayer/jimu-signaling-server/src/events/types';

onUnmounted(() => {
  ServiceConnect.disconnect()
})

const editDialog = ref<InstanceType<typeof EditDialog>>()

async function connect() {
  const master = await ServiceAction.preconnect() as IUserInfo
  if(master.uuid) {
    return editDialog.value?.open(master.uuid);
  }
  ServiceConnect.connect();
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
      
      <button class="connect" type="button" v-if="!ServiceConnect.connected" @click="connect">Connect</button>
      
      <button type="button" v-if="ServiceConnect.connected" @click="ServiceConnect.disconnect">Disconnect</button>



      <button type="button" @click="ServiceAction.saveSchema" >Save</button>
    </div>


  </div>
  <EditDialog ref="editDialog"></EditDialog>
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
