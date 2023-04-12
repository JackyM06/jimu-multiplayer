<script setup lang='ts'>
import { 
    ControlField,
    ControlFieldCheckbox,
    ControlFieldInputNumber
} from '@editor/element-control-panel/control'
</script>

<template>
    <div>
        <ControlField label="是否可见">
            <ControlFieldCheckbox path="visible"></ControlFieldCheckbox>
        </ControlField>
        <ControlField label="高度">
            <ControlFieldInputNumber path="styles.default.height"></ControlFieldInputNumber>
        </ControlField>
    </div>
</template>

<style scoped lang="less">

</style>
