<script setup lang='ts'>
import { 
    ControlField,
    ControlFieldInput,
    ControlFieldInputNumber,
} from '@editor/control-core'

</script>

<template>
    <div>
        <ControlField label="跳转地址">
            <ControlFieldInput path="url"></ControlFieldInput>
        </ControlField>
        <ControlField label="左边距">
            <ControlFieldInputNumber path="styles.default.left"></ControlFieldInputNumber>
        </ControlField>
        <ControlField label="上边距">
            <ControlFieldInputNumber path="styles.default.top"></ControlFieldInputNumber>
        </ControlField>
    </div>
</template>

<style scoped lang="less">

</style>
