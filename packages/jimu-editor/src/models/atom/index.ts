import { ref } from 'vue'
import { get, set } from 'lodash-es'
import { SchemaModel } from '../schema'
import { MultiPlayerCore } from '../crdt';
import { ElementStore } from '@editor/elements'
import { getUuid } from '@editor/utils/schema';
import { ISchemaItem } from '@editor/types';
import { LayoutType } from '@editor/const';
import { ElementDraggerManager } from '../dragger';

export class Atom {
    private static currentEid_ref = ref('app');

    public static get currentEid() {
        return this.currentEid_ref.value;
    }

    public static set currentEid(val) {
        this.currentEid_ref.value = val;
    }

    public static setActiveElement(eid: string): void {
        this.currentEid = eid;
    }

    public static removeElement(eid: string): void {
        SchemaModel.removeModel(eid)
    }

    public static createModel(name: string, parentEid: string) {
        if(!ElementStore[name]) {
            return;
        }
        const { manifest, config } = ElementStore[name];
        const eid = getUuid(name);
        const schema: ISchemaItem = {
            manifest,
            editorData: {
                name: manifest.cname,
            },
            parent: parentEid,
            eid,
            props: {} as any
        }

        SchemaModel.addModel(schema);

        Object.keys(config.props).forEach(key => {
            this.setElementProp(key, config.props[key], eid);
        })
        this.setModelParent(eid, parentEid);
    }

    public static setModelParent(eid: string, parent: string) {
        const model = SchemaModel.getModel(eid);
        const parentModel = SchemaModel.getModel(eid);

        if(!model || !parentModel) {
            return;
        }

        model.parent = parent;
        const parentChild = SchemaModel.getModelProp(parent, 'children') || [];
        this.setElementProp('children', [
            ...parentChild,
            eid,
        ], parent);

        ElementDraggerManager.initialize();
        
    }

    public static getLastBlockEid(eid = this.currentEid): string {
        const layout = this.getElementProp('layout', eid);
        if(layout === LayoutType.BLOCK) {
            if(eid === 'app') {
                return this.getElementProp('children', 'app')[0]
            }
            return eid;
        }
        return this.getLastBlockEid(SchemaModel.getModelParent(eid))

    }


    public static setElementProp(path: string, value: any, eid = this.currentEid, canBroadcast = true): void {
        SchemaModel.setModelProp(eid, path, value);
        canBroadcast && MultiPlayerCore.changeElementProps(eid, path, value)
    }

    public static getElementProp(path: string, eid = this.currentEid) {
        return SchemaModel.getModelProp(eid, path);
    }

    public static getElementManifest(eid = this.currentEid) {
        return SchemaModel.getModelManifest(eid);
    }

}