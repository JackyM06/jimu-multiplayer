import { ref } from 'vue'

export class ServiceConnect {
    private static connected_ref = ref(false);
    private static username_ref = ref('not connect');

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
        this.connected = true;
    }
    public static async disconnect() {
        this.connected = false;
    }
}