import { ref } from 'vue'
import { ServiceSocket } from './socket'

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
        this.connected = true;
    }

    public static async disconnect() {
        await this.socket.disconnect();
        this.connected = false;
        this.clear();
    }

    public static clear() {
        this.userinfo_ref.value = {};
    }
}

ServiceConnect.socket.addEventListener('joined', (data) => {
    const { uuid } = data;
    ServiceConnect.username = uuid;
})

ServiceConnect.socket.addEventListener('userRefresh', (data) => {
    const { total } = data;
    ServiceConnect.userTotals = total;
})