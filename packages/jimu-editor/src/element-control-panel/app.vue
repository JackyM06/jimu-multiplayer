<script setup lang='ts'>
import { 
    ControlField,
    ControlFieldCheckbox
} from '@editor/element-control-panel/control'
</script>

<template>
    <div>
        <ControlField label="是否可见">
            <ControlFieldCheckbox path="visible"></ControlFieldCheckbox>
        </ControlField>
    </div>
</template>

<style scoped lang="less">

</style>
