import { ServerEmitType, ServerSubscriptionType } from "@multiplayer/jimu-signaling-server/src/config/events";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

export class ServiceSocket {
    public socket: Socket;

    constructor() {
        this.socket = io(`${location.protocol}//${location.hostname}:6001`, {
            path:'/signaling-socket/',
            autoConnect: false,
        });
    }

    get connected() {
        return this.socket.connected;
    }

    public connect() {
        this.socket.connect();
        if(this.connected) {
            return;
        }
        
        return new Promise<void>((resolve, reject) => {
            const realResolve = () => {
                this.socket.removeListener('connect', realResolve);
                resolve();
            }

            const realReject = () => {
                this.socket.removeListener('connect_error', realReject);
                resolve();
            }
            this.socket.on('connect', realResolve)
            this.socket.on('connect_error', realReject)
        })
    }

    public disconnect() {
        this.socket.disconnect();
        if(!this.connected) {
            return;
        }
        return new Promise<void>((resolve, reject) => {
            const realResolve = () => {
                this.socket.removeListener('disconnect', realResolve);
                resolve();
            }

            const realReject = () => {
                this.socket.removeListener('disconnect_error', realReject);
                resolve();
            }
            this.socket.on('disconnect', realResolve)
            this.socket.on('disconnect_error', realReject)
        })
    }

    public checkConnect() {
        if(this.connected) {
            return;
        }
        return this.connect()   
    }


    public async send<T>(message: string, data?:T) {
        await this.checkConnect();
        this.socket.send(message, data);
    }

    public async emit<T>(event: ServerSubscriptionType, data?:T) {
        await this.checkConnect();
        this.socket.emit(event, data)
    }

    public addEventListener(event: ServerEmitType, listener: (event: any) => void) {
        this.socket.on(event, listener)
    }
}