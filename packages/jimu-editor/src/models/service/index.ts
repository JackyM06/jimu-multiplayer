import { ref } from 'vue'
import { ServiceSocket } from './socket'

export class ServiceConnect {
    private static connected_ref = ref(false);
    private static username_ref = ref('not connect');

    public static socket = new ServiceSocket();

    public static get connected() {
        return this.connected_ref.value;
    }

    public static set connected(val) {
        this.connected_ref.value = val;
    }

    public static get username() {
        return this.username_ref.value;
    }

    public static set username(val) {
        this.username_ref.value = val;
    }

    public static async connect() {
        await this.socket.connect();
        this.connected = true;
    }
    public static async disconnect() {
        await this.socket.disconnect();
        this.connected = false;
    }
}