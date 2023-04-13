<script setup lang='ts'>
import { 
    ControlField,
    ControlFieldCheckbox
} from '@editor/control-core'
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
