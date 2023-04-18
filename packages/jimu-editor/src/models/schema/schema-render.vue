<script setup lang='ts'>
import { computed, ref } from 'vue';
import { SchemaModel } from '.';
import { LayoutType } from '@editor/const';
import { Atom } from '../atom';
import { MultiPlayerCore } from '../crdt';
import { stringToColor, styleHelper } from "@editor/utils/schema";
import { ElementDraggerManager } from '../dragger';

const props = withDefaults(
    defineProps<{
        eid?: string
    }>(),
    {
        eid: 'app',
    },
);

const schemaEl = ref<HTMLDivElement>();

const model = computed(() => {
    return SchemaModel.getModel(props.eid);
})

const isBlockNode = computed(() => {
    return SchemaModel.getModelProp(props.eid, 'layout') === LayoutType.BLOCK
})

const selected = computed(() => {
    return  props.eid === Atom.currentEid
});

const otherSelected = computed(() => {
    return  MultiPlayerCore.selectedEidMap.value[props.eid] || ''
});

const children = computed(() => {
    return SchemaModel.getModelProp(props.eid, 'children') || []
})

function onClick(e: MouseEvent) {
    const otherSelected = MultiPlayerCore.selectedEidMap.value[props.eid];
    if(!otherSelected) {
        Atom.setActiveElement(props.eid);
        schemaEl.value?.focus();
    } 
}

function onMousedown(e: MouseEvent) {
    if(isBlockNode.value) {
        return;
    }
    ElementDraggerManager.onMouseDown(props.eid, e);
}

function onMousemove(e: MouseEvent) {
    if(isBlockNode.value) {
        return;
    }
    ElementDraggerManager.onMouseMove(props.eid, e);
}

function onMouseup(e: MouseEvent) {
    if(isBlockNode.value) {
        return;
    }
    ElementDraggerManager.onMouseUp(props.eid, e);
}
</script>

<template>
    <div
        :class="[
                    isBlockNode ? 'block' : 'element',
                    selected ? 'selected' : '',
                    otherSelected ? 'other-selected' : '',
                    'schema-item',
                ]"
        :style="{
                    ...styleHelper(model?.props as any),
                    ...otherSelected ? {'border-color': stringToColor(otherSelected)} : {}
                }"
        :data-eid="eid"
        :key="eid"
        :id="`E${eid}`"
        @click.stop="onClick"
        @mouseup="onMouseup"
        @mousedown="onMousedown"
        @mousemove="onMousemove"
        @keydown.backspace.stop="Atom.removeElement(eid)"
        tabindex="0"
        ref="schemaEl"
    >
        <span 
            v-if="otherSelected"
            class="player-hit"
            :style="{ background: stringToColor(otherSelected)}"
        >{{ otherSelected }}</span>

        <span class="hit">{{ model?.editorData.name }}</span>

        <div>
            <schema-render v-for="childEid in children" :key="childEid" :eid="childEid"></schema-render>
        </div>

    </div>
</template>

<style scoped lang="less">

</style>
