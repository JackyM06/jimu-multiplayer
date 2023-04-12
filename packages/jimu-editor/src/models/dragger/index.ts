import { ref } from 'vue'
import { Atom } from '../atom';

export class ElementDraggerManager {

    private static isDragging_ref = ref(false);

    private static elementOffset = {
        x: 0,
        y: 0,
    }

    public static get isDragging(): boolean {
        return this.isDragging_ref.value
    }

    public static set isDragging(value) {
        this.isDragging_ref.value = value
    }
    
    public static onMouseDown(eid: string, event: MouseEvent) {
        event.stopPropagation();
        if(eid !== Atom.currentEid) {
            return;
        }
        this.isDragging = true;

        const y = Atom.getElementProp('styles.default.top')
        const x = Atom.getElementProp('styles.default.left')


        this.elementOffset.x = event.clientX - x;
        this.elementOffset.y = event.clientY - y;


    }

    public static onMouseUp(eid: string, event: MouseEvent) {
        event.stopPropagation();
        
        this.isDragging = false;

        this.elementOffset.x = 0;
        this.elementOffset.y = 0;
    }

    public static onMouseMove(eid: string, event: MouseEvent) {
        event.stopPropagation();
        if(!this.isDragging) {
            return;
        }        
        const y = event.clientY - this.elementOffset.y;
        const x = event.clientX - this.elementOffset.x;

        Atom.setElementProp('styles.default.top', y);
        Atom.setElementProp('styles.default.left', x);
    }
}