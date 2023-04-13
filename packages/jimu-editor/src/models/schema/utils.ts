import { computed, createVNode, h } from "vue";
import { Atom } from "../atom";
import { MultiPlayerCore } from "../crdt";
import { SchemaModel } from ".";
import { stringToColor, styleHelper } from "@editor/utils/schema";
import { ElementDraggerManager } from "../dragger";
import { LayoutType } from "@editor/const";

export function onSelected(eid: string, e: MouseEvent,) {
    const otherSelected = MultiPlayerCore.selectedEidMap.value[eid];
    if(!otherSelected) {
        Atom.setActiveElement(eid)
    } 
    e.stopPropagation()
}

export const schemaView = computed(() => {
    const getVNode = (eid: string):ReturnType<typeof h> => {
        const item = SchemaModel.getModel(eid);
        const isBlockNode = SchemaModel.getModelProp(eid, 'layout') === LayoutType.BLOCK
        const selected = eid === Atom.currentEid;
        const otherSelected = MultiPlayerCore.selectedEidMap.value[eid];
        return createVNode(
            'div', 
            {
                class: [
                    isBlockNode ? 'block' : 'element',
                    selected ? 'selected' : '',
                    otherSelected ? 'other-selected' : '',
                    'schema-item',
                ],
                style: {
                    ...styleHelper(item?.props as any),
                    ...otherSelected ? {'border-color': stringToColor(otherSelected)} : {}
                },
                'data-eid': eid,
                id: `E${eid}`,
                onClick: onSelected.bind(null, eid),
                ...(!isBlockNode ? {
                    onMousemove: ElementDraggerManager.onMouseMove.bind(ElementDraggerManager, eid),
                    onMousedown: ElementDraggerManager.onMouseDown.bind(ElementDraggerManager, eid),
                    onMouseup: ElementDraggerManager.onMouseUp.bind(ElementDraggerManager, eid),
                } : {}),

            },
            [
                ...otherSelected ? [createVNode('span', {
                    style: { background: stringToColor(otherSelected) },
                    class: 'player-hit',
                }, otherSelected),] : [],
                createVNode('span', {class: 'hit'}, item?.editorData.name),
                item?.props.children?.value.value.map(e => getVNode(e))
            ]
        )
    }
    return getVNode('app')
})