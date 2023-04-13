<script setup lang='ts'>
import { Atom } from '@editor/models/atom';
import { computed } from 'vue'
const props = withDefaults(
    defineProps<{
        path:string
    }>(),
    {
        path: '',
    },
);

const value = computed({
    get() {
        return Atom.getElementProp(props.path)
    },
    set(value) {
        Atom.setElementProp(props.path, value)
    }
})


</script>

<template>
    <input type='checkbox' v-model="value">
</template>

<style scoped lang="less">

</style>
