import { watch, ref, computed } from 'vue'
import {ServiceConnect} from '@editor/models/service'
import { ServerEmitType, ServerSubscriptionType } from '@multiplayer/jimu-signaling-server/src/config/events'
import { Atom } from '../atom'
import { IElementPropInfo, IPlayerInfo } from '@multiplayer/jimu-signaling-server/src/events/types'
import { debounce } from 'lodash-es'

const realSendElementPropUpdate = debounce(() => {
    MultiPlayerCore.realEmitNotDebounced()
}, 0)

export class MultiPlayerCore {
    public static otherPlayer = ref<Record<string, IPlayerInfo>>({})

    public static elementPropsWaitMap: Record<string, IElementPropInfo> = {};

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
        ServiceConnect.socket.emit(ServerSubscriptionType.SET_ACTIVE_EID, Atom.currentEid)
    }

    public static changeElementProps(eid: string, path: string, value: any) {
        this.elementPropsWaitMap[`${eid}-${path}`] = { eid, path, value };
        realSendElementPropUpdate();
    }

    public static onConnect() {
        ServiceConnect.socket.addEventListener(ServerEmitType.PLAYER_REFRESH, MultiPlayerCore.onOtherPlayerUpdate)
        ServiceConnect.socket.addEventListener(ServerEmitType.PLAYER_UNJOINED, MultiPlayerCore.onOtherPlayerUnjoined)
        ServiceConnect.socket.addEventListener(ServerEmitType.ELEMENT_PROP_CHANGE, MultiPlayerCore.onElementPropUpdate)
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

    public static onElementPropUpdate(propInfos: IElementPropInfo[]) {
        propInfos.forEach(propInfo => {
            const { eid, path, value } = propInfo;
            Atom.setElementProp(path, value, eid, false);
        })
    }

    public static realEmitNotDebounced() {
        ServiceConnect.socket.emit(ServerSubscriptionType.SET_ELEMENT_PROP, Object.values(MultiPlayerCore.elementPropsWaitMap))
        MultiPlayerCore.elementPropsWaitMap = {};
    }
}




