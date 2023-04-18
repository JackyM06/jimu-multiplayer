import { watch, ref, computed } from 'vue'
import {ServiceConnect} from '@editor/models/service'
import { ElementOperationType, ServerEmitType, ServerSubscriptionType } from '@multiplayer/jimu-signaling-server/src/config/events'
import { Atom } from '../atom'
import { IElementCreate, IElementDelete, IElementUnionOperation, IElementUpdate, IOperationInfo, IPlayerInfo } from '@multiplayer/jimu-signaling-server/src/events/types'
import { debounce } from 'lodash-es'
import { LoggerManager } from '../logger';

const realSendElementPropUpdate = debounce(() => {
    MultiPlayerCore.realEmitNotDebounced()
}, 0)

export class MultiPlayerCore {
    public static otherPlayer = ref<Record<string, IPlayerInfo>>({})

    public static elementOperationWaitMap: Record<string, IElementUnionOperation> = {};

    public static selectedEidMap = computed(() => {
        return Object.keys(this.otherPlayer.value).reduce((res, cur) => {
            const player = this.otherPlayer.value[cur];
            if(player.editorInfo?.activeEid) {
                res[player.editorInfo.activeEid] = cur;
            }
            return res;
        }, {} as Record<string, string>)
    })

    private static multiWatchers:(() => void)[] = []
    
    public static selectedElement() {
        if(!ServiceConnect.connected) {
            return;
        }
        ServiceConnect.socket.emit(ServerSubscriptionType.SET_ACTIVE_EID, Atom.currentEid)
    }

    public static changeElementOperation(operation: IElementUnionOperation) {
        const { uuid, type, eid, path } = operation;
        if(uuid !== ServiceConnect.username) {
            return;
        }
        LoggerManager.appendLogger(operation)
        this.elementOperationWaitMap[`${type}-${eid}-${path}`] = operation;
        realSendElementPropUpdate();
    }

    public static onConnect() {
        ServiceConnect.socket.addEventListener(ServerEmitType.PLAYER_REFRESH, MultiPlayerCore.onOtherPlayerUpdate)
        ServiceConnect.socket.addEventListener(ServerEmitType.PLAYER_UNJOINED, MultiPlayerCore.onOtherPlayerUnjoined)
        ServiceConnect.socket.addEventListener(ServerEmitType.ELEMENT_OPERATION_UPDATE, MultiPlayerCore.onElementOperationUpdate)
        this.multiWatchers.push(
            watch(() => Atom.currentEid, MultiPlayerCore.selectedElement)
        )
    }

    public static onDisconnect() {
        this.otherPlayer.value = {};
        this.multiWatchers.forEach(e => e?.())
    }

    public static onOtherPlayerUpdate(player: IPlayerInfo) {
        const {uuid} = player.userInfo;
        MultiPlayerCore.otherPlayer.value[uuid] = player;
    }

    public static onOtherPlayerUnjoined(uuid: string) {
        Reflect.deleteProperty(MultiPlayerCore.otherPlayer.value, uuid);
    }

    public static onElementOperationUpdate(operations: IElementUnionOperation[]) {
        operations.forEach(operation => {
            LoggerManager.appendLogger(operation)

            const { type, uuid } = operation; 
            switch(type) {
                case ElementOperationType.CREATE: {
                    const { schema } = operation;
                    Atom.loadSchemaItem(schema);
                    return;
                };
                case ElementOperationType.EDIT: {
                    const { path, value, eid } = operation;
                    Atom.setElementProp(path || '', value, eid, uuid);
                    return;
                }
                case ElementOperationType.DELETE: {
                    const { eid } = operation;
                    Atom.removeElement(eid || '', uuid);
                    return;
                };
            }
        })
    }


    public static realEmitNotDebounced() {
        if(!ServiceConnect.connected) {
            return;
        }
        ServiceConnect.socket.emit(ServerSubscriptionType.SET_ELEMENT_OPERATION, Object.values(MultiPlayerCore.elementOperationWaitMap))
        MultiPlayerCore.elementOperationWaitMap = {};
    }
}




