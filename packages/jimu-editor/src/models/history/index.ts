import { ref } from "vue";

export class HistoryManager {
    private static historyLinkList = ref<{}[]>([])
    private static currentPoint = ref(0)

    public static do() {
        
    }

    public static redo() {

    }

    public static undo() {

    }
}