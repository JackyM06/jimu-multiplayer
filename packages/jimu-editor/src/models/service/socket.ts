import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

export class ServiceSocket {
    public socket: Socket;

    constructor() {
        this.socket = io('http://localhost:6001', {
            path:'signaling-socket',
        })
        this.connect()
    }

    get connected() {
        return this.socket.connected;
    }

    public connect() {
        this.socket.connect();
        return new Promise<void>((resolve, reject) => {
            this.socket.on('connect', resolve)
            this.socket.on('connect_error', reject)
        })
    }

    public disconnect() {
        this.socket.disconnect();
        return new Promise<any>((resolve, reject) => {
            this.socket.on('disconnect', resolve)
            this.socket.on('disconnect_error', reject)
        })
    }
    
}