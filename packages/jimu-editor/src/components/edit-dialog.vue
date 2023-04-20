<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import Dialog from './dialog.vue'
import { ServiceConnect } from '@editor/models/service';


const dialog = ref<InstanceType<typeof Dialog>>()


function cancelJoinOnline() {
    dialog.value?.close()
}

function joinOnline() {
    ServiceConnect.connect()
    // Loading
    dialog.value?.close()
}


const masterName = ref('')

defineExpose({
    open(name: string) {
        masterName.value = name;
        dialog.value?.open()
    }
}) 



</script>

<template>
    <Dialog ref="dialog">
        <p>当前活动正在被<i>{{ masterName }}</i>编辑</p>
        <p>是否申请协同编辑?</p>
        <div class="footer">
            <button @click="joinOnline">申请</button>
            <button @click="cancelJoinOnline">取消</button>
        </div>
    </Dialog>
</template>

<style scoped lang="less">
.footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
button {
    padding: 6px 14px;
    margin-left: 20px;
    color: #fff;
    font-size: 16px;
    background-color: #020202;
    border-radius: 0;
    outline: none;
}
</style>
