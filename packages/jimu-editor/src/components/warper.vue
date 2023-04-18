<script setup lang="ts">
import SchemaView from '@editor/models/schema/schema-render.vue';
</script>

<template>
    <div class="warper">
        <SchemaView></SchemaView>
    </div>
</template>

<style lang="less" scoped>
.warper {
    position: relative;
    height: 400px;
    padding: 30px;
    margin: 20px 20px;
    text-align: left;
    background-color: rgb(255, 255, 255);
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=);
    background-position: -1px -1px;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA4ZJREFUWEftV11Ik2EUftRw2nKpGEUrkIGKrBS9cM4bRVH5GBMvohAyRuiFOAhNkIhMDMuwocwV+cOEXXQhIQSBYjichEW4YbhuVFJME761ia6f6WaLI99kjc1NneiFLxw2xrvvPM9znnPe94vAEa+II86PYweAAFG4uTh0gbwViAQQtby8/FwoFN4BsAXAedhAvAGcAhBrsVia1tfXb2xubjalp6e/BrABwHVYQHwBCPR6/bWYmJinqampfJZlPywtLTWVlJR8ArDJqRLWsngDiAIQr1AornZ2dg7Hx8fz2tvboVQqnVarVdPW1vZMo9FYubL8DRcKbwD0/SyASzabbaKwsDBuamoKGRkZUKlULrFYbLHb7a1paWk6AI5wlcW3Dc8AEJrN5gGVSpXR39+/Q7SyshIdHR1Ou93+cWVl5XFeXt445w8y676XL4BYABcmJiYemkymCqVSGe37ZCpLfX29m2XZ7sHBQVVtbe23g5TFFwAlPKfVaivEYnGzRCLh+6MmEonQ19fnyMrKWltdXVWJRKKX+y2LLwAyYqJMJsscGBgY4vP51JoBV3l5ObRaLbXp5MLCQkd2dvbQXsviC8BjxMssy75nGEZgNBoDAuDxeMjPz4dUKkVzczOsVuuLpKSkuxwImqZBl7+zYNuI09PTr7q6urJ7enr+e0hKSgpkMhmKi4s3pFJppNvtdi4uLk7bbLZ3MzMzozU1NZMAfgMIqVX9ASAjnjcYDA9mZ2dvVlVV7Rixrq4OLS0tzrm5uYX5+XmjXq//rNFovgBYB0Az4geANc4P+1aAEib19vZez8nJac3MzDxNEkgkEoyNjW01NjY+UqvVVBdK9Itj+wcABTH3zIig8tMGfwqQERMKCgqujIyMjEZHR9MhBYPB4HC5XG+Lioq6AFg41pSMRjSdFRQ0E0KS3oPOHwBvIxoYhkmQy+VQKBRLycnJlQCo70lqYkxJ95TQV5ZAFxIy4kWz2axTq9WS7u5uGsf3Ghoa3gD4DuBnuA6mQAC2jTg+Pt4oEAhuORyO4dzc3Ccc+1VO9pBqHGxTIABkxESdTidnGOZ+aWnpbZPJ9BUAy0kfksODJQ9kQvqdjBgnl8uF1dXV0rKyslEAxNweLul3M6EHGA9ADAAax+R0j+NDIRbynt1uxdt3RAD0Se1FETbpgykQMoODbjx27wUHJbTn/58ocKLAPygyQzAwIc98AAAAAElFTkSuQmCC)4 4,auto !important;
}

:deep(.schema-item) {
    &.block {
        position: relative;
        margin: -1px -1px;
        border: 1px solid rgb(154, 150, 150,);
    }

    &.selected {
        box-sizing: border-box;
        border: 4px solid red;
        cursor: move;
        &.block {
            cursor: inherit;
        }
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
