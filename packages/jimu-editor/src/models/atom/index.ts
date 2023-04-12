import { ref } from 'vue'
import { get, set } from 'lodash-es'
import { SchemaModel } from '../schema'
import { MultiPlayerCore } from '../crdt';

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

    }

    public static createChild() :void {

    }

    public static setElementProp(path: string, value: any, eid = this.currentEid, canBroadcast = true): void {
        canBroadcast && MultiPlayerCore.changeElementProps(eid, path, value)
        return SchemaModel.setModelProp(eid, path, value);

    }

    public static getElementProp(path: string, eid = this.currentEid) {
        return SchemaModel.getModelProp(eid, path);
    }

    public static getElementManifest(eid = this.currentEid) {
        return SchemaModel.getModelManifest(eid);
    }

}