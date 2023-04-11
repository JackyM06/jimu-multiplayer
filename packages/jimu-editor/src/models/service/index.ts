import { ref } from 'vue'
import { ServiceSocket } from './socket'
import { ServerEmitType } from '@multiplayer/jimu-signaling-server/src/config/events'
import { IUserInfo, IUserOverview } from '@multiplayer/jimu-signaling-server/src/events/types'
import { MultiPlayerCore } from '@editor/models/crdt'
export class ServiceConnect {
    private static connected_ref = ref(false);
    private static userinfo_ref = ref<Partial<{
        username: string,
        userTotals: number
    }>>({});

    public static socket = new ServiceSocket();

    public static get connected() {
        return this.connected_ref.value;
    }

    public static set connected(val) {
        this.connected_ref.value = val;
    }

    public static get username() {
        return this.userinfo_ref.value.username || 'not connected';
    }

    public static set username(val) {
        this.userinfo_ref.value.username = val;
    }

    public static get userTotals() {
        return this.userinfo_ref.value.userTotals || 0;
    }

    public static set userTotals(val) {
        this.userinfo_ref.value.userTotals = val;
    }

    public static async connect() {
        await this.socket.connect();
        MultiPlayerCore.onConnect();
        this.connected = true;
    }

    public static async disconnect() {
        await this.socket.disconnect();
        MultiPlayerCore.onDisconnect();
        this.connected = false;
        this.clear();
    }

    public static clear() {
        this.userinfo_ref.value = {};
    }
}

ServiceConnect.socket.addEventListener(ServerEmitType.JOINED, (data: IUserInfo) => {
    const { uuid } = data;
    ServiceConnect.username = uuid;
})

ServiceConnect.socket.addEventListener(ServerEmitType.USER_REFRESH, (data: IUserOverview) => {
    const { total } = data;
    ServiceConnect.userTotals = total;
    MultiPlayerCore.selectedElement()
})