<script setup lang='ts'>
import { ElementStore } from '@editor/elements'
import { Atom } from '@editor/models/atom'

const allElements = Object.values(ElementStore)
.map(e => e.manifest)
.filter(e => e.name !== 'app');


</script>

<template>
    <div class="market">
        <div 
            class="item" 
            @click="Atom.createModel(name, Atom.getLastBlockEid())" 
            v-for="{name, cname} in allElements" :key="name"
        >
            {{ cname }}
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
