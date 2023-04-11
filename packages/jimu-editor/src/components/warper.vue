<script setup lang="ts">
import { SchemaModel } from '@editor/models/schema';
</script>

<template>
    <div class="warper">
        <component  :is="SchemaModel.schemaView.value"></component>
    </div>
</template>

<style lang="less" scoped>
.warper {
    position: relative;
    height: 400px;
    padding: 30px;
    margin: 0 20px;
    text-align: left;
    background-color: rgb(255, 255, 255);
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=);
    background-position: -1px -1px;
}

:deep(.schema-item) {
    cursor: pointer;

    &.block {
        position: relative;
        margin: -1px -1px;
        border: 1px solid rgb(154, 150, 150,);
    }

    &.selected {
        box-sizing: border-box;
        border: 4px solid red;
    }

    &.other-selected {
        border: 4px solid;
        cursor: not-allowed;
        .player-hit {
            position: absolute;
            top: 0;
            left: 0;
            color: #fff;
            font-size: 12px;
        }
    }

    &.element {
        position: absolute;
        display: inline-flex;
        padding: 10px 20px;
        color: #3b542c;
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
        background-color: rgba(0, 234, 0,.5);
        border-radius: 5px;
    }
}
</style>
