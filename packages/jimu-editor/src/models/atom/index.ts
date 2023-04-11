/**
 * 当前Schema
 * @export
 * @class Atom
 */
import { ref } from 'vue'

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
        console.log('currentEid: ' + this.currentEid)
    }

    public static removeElement(eid: string): void {

    }

    public static createChild() :void {

    }

    public static setElementProp(path: string, value: any) {

    }

    public static getElementProp(path: string) {
        
    }
}