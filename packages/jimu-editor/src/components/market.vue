<script setup lang='ts'>

import { SchemaModel } from '@editor/models/schema';
import { ref, onMounted, nextTick } from 'vue';

const allElements = SchemaModel.getAllElementManifest().filter(e => e.name !== 'app');


function addElement() {
    // 添加组件
}

</script>

<template>
    <div class="market">
        <div class="item" @click="addElement" v-for="manifest in allElements" :key="manifest.name">
            {{ manifest.cname }}
        </div>
    </div>
</template>

<style scoped lang="less">
.market {
    display: flex;
    flex-wrap: wrap;
    width: 220px;
    padding: 20px;
    font-size: 14px;
    border-right: 2px solid #f8f1e0;

    .item {
        width: 70px;
        height: 70px;
        margin-right: 10px;
        color: #f8f1e0;
        line-height: 70px;
        text-align: center;
        background-color: #b14145;
        border-radius: 5px;
        cursor: pointer;
    }
}
</style>
