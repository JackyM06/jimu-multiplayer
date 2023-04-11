import { watch, ref, computed } from 'vue'
import {ServiceConnect} from '@editor/models/service'
import { ServerEmitType, ServerSubscriptionType } from '@multiplayer/jimu-signaling-server/src/config/events'
import { Atom } from '../atom'
import { IPlayerInfo } from '@multiplayer/jimu-signaling-server/src/events/types'


export class MultiPlayerCore {
    public static otherPlayer = ref<Record<string, IPlayerInfo>>({})

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

    public static onConnect() {
        ServiceConnect.socket.addEventListener(ServerEmitType.PLAYER_REFRESH, MultiPlayerCore.onOtherPlayerUpdate)
        ServiceConnect.socket.addEventListener(ServerEmitType.PLAYER_UNJOINED, MultiPlayerCore.onOtherPlayerUnjoined)
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
}


