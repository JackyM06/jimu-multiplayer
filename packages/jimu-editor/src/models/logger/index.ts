import { ElementOperationType } from "@editor/const";
import { ref } from "vue";
import { ServiceConnect } from "../service";
import { IElementUnionOperation } from "@multiplayer/jimu-signaling-server/src/events/types";

export interface ILogger {
    eid: string,
    type: ElementOperationType,
    time: number,
    username: string,

    extras?: Partial<{
        path: string,
        value: unknown,
    }>
}

export class LoggerManager {
    private static logger = ref<Record<string, IElementUnionOperation[]>>({});

    public static appendLogger(logger: IElementUnionOperation): void {

        if(!ServiceConnect.connected) {
            return;
        }

        const { uuid } = logger;
        if(!uuid) {
            return;
        }
        const list = this.logger.value[uuid] || [];
        list.unshift(logger);
        this.logger.value[uuid] = list
    }

    public static getLoggerUsers() {
        return Object.keys(this.logger.value)
    }

    public static getUserLoggers(username = ServiceConnect.username) {
        return this.logger.value[username] || [];
    }
}