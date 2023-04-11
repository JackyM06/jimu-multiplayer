import { ISchemaItem } from '@editor/types';
import mockSchema from './mock';
import { computed, createVNode, h, ref } from 'vue';
import { Atom } from '../atom'
import { stringToColor, styleHelper } from '@editor/utils/schema';
import { MultiPlayerCore } from '../crdt';

export class SchemaModel {
    
    public static manger = ref(new Map<string, ISchemaItem>())

    public static loadSchema(schema = mockSchema) {
        schema.forEach(this.createModel);
    }

    public static createModel(schemaItem: ISchemaItem) {
        SchemaModel.manger.value.set(schemaItem.eid, schemaItem)
    }

    public static removeModel(eid: string) {
        SchemaModel.manger.value.delete(eid);
    }

    public static getModel(eid: string ) {
        return SchemaModel.manger.value.get(eid)
    }

    public static schemaView = computed(() => {
        const getVNode = (eid: string):ReturnType<typeof h> => {
            const item = SchemaModel.getModel(eid);
            const isBlockNode = !!item?.props.children
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
                        ...styleHelper(item?.props.style as any),
                        ...otherSelected ? {'border-color': stringToColor(otherSelected)} : {}
                    },
                    'data-eid': eid,
                    id: `E${eid}`,
                    onClick(e: MouseEvent) {
                        const otherSelected = MultiPlayerCore.selectedEidMap.value[eid];
                        if(!otherSelected) {
                            Atom.setActiveElement(eid)
                        } 

                        e.stopPropagation()
                    }

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
}

SchemaModel.loadSchema();