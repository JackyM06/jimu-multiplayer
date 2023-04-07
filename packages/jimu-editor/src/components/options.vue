<script setup lang="ts">
import { computed, ref } from 'vue'
import { ServiceConnect } from '@jimu/editor/src/models/service'

</script>

<template>
  <div class="card">
    <button class="connect" type="button" v-if="!ServiceConnect.connected" @click="ServiceConnect.connect">Connect</button>
    <button type="button" v-else @click="ServiceConnect.disconnect">Disconnect</button>

  </div>
</template>

<style lang="less" scoped>
.card {
    display: flex;
    justify-content: flex-end;
    padding: 50px;
}

button {
    margin-left: 20px;
    filter: drop-shadow(0 0 1.5em #646cffaa);

    &.connect {
        filter: drop-shadow(0 0 1.5em #42b883aa);
    }
}
</style>
