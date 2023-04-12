<script setup lang='ts'>

import { Atom } from '@editor/models/atom';
import App from '@editor/element-control-panel/app.vue';
import SystemBlock from '@editor/element-control-panel/system-block.vue';
import CommonButton from '@editor/element-control-panel/common-button.vue';
import { computed } from 'vue';

const manifest = computed(() => Atom.getElementManifest())

const controlViewComponent = computed(() => {
    const map: Record<string, any> = {
        'common-button': CommonButton,
        'system-block': SystemBlock,
        'app': App,
    }
    return manifest.value?.name && map[manifest.value.name]
})

</script>

<template>
    <div class="panel">
        <div class="element-info">
            <p>组件名：{{ manifest?.cname }}</p>
            <p>EId：{{ Atom.currentEid }}</p>
        </div>
        <div class="element-control">
            <component :is="controlViewComponent"></component>
        </div>
    </div>
</template>

<style scoped lang="less">
.panel {
    width: 320px;
    font-size: 14px;
    border-left: 2px solid #f8f1e0;
    .element-info {
        padding: 20px;
        border-bottom: 2px solid #f8f1e0;

        p {
            padding: 0;
            margin: 0;
            margin-bottom: 10px;
            text-align: left;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    .element-control {
        padding: 20px;
    }
}
</style>
