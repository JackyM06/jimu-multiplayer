<script setup lang='ts'>

import { ref } from 'vue';

const dialogEl = ref<HTMLDialogElement>();

function open() {
    // dialogEl.value?.show();
    dialogEl.value?.showModal();
}

function close() {
    dialogEl.value?.close();
}

defineExpose({
    open,
    close,
})

</script>

<template>
    <dialog ref="dialogEl" class="dialog">
        <div>
            <slot></slot>
        </div>
    </dialog>
</template>

<style scoped lang="less">
.dialog {
    width: 400px;
    background: #fff;
    border: none;
    border-radius: 6px;
    outline: none;
    &::backdrop {
        background: rgba(0, 0, 0, .73);
    }
}
</style>
