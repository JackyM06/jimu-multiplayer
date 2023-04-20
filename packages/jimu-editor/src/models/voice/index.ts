import { Peer, DataConnection, MediaConnection } from "peerjs";
import { ServiceConnect } from '@editor/models/service'
import { ref, watch } from "vue";

const joinedAudio = new Audio('https://cdnfile.corp.kuaishou.com/kc/files/a/doodle_editor/multiplayer/joined.mp3')
const unjoinedAudio = new Audio('https://cdnfile.corp.kuaishou.com/kc/files/a/doodle_editor/multiplayer/unjoined.mp3')

function getVideo() {
    const video = document.createElement('video')
    document.body.appendChild(video);
    return video;
}

export class Voice {
    public static get opened() {
        return this.online.value
    }

    public static close() {
        this.disconnect()
        unjoinedAudio.play();
    }

    private static peer: Peer;

    private static stream: MediaStream;
    
    private static online = ref(false);

    private static streams: Record<string, MediaStream> = {};

    private static players: Record<string, HTMLAudioElement> = {};

    private static connects: Record<string, DataConnection> = {};
    private static mediaConnects: Record<string, MediaConnection> = {};

    private static get otherIDs() {
        return ServiceConnect.onlineUsers.filter(e => e.uuid !== ServiceConnect.username).map(e => e.uuid);
    }

    public static open() {
        this.peer = this.peer || new Peer(ServiceConnect.username, {
            host: location.hostname,
            ...(location.hostname === 'localhost' ? {port: 9000} : {}),
            path: '/peer',
        });

        if(this.peer.disconnected) {
            this.peer.reconnect()
        }

        this.peer.on('open', (e) => {
            this.online.value = true;
            this.setAudioSteam();
        })

        this.peer.on('connection', (e) => {
            console.log('connection', e, this.online.value);
            this.setAudioSteam()
        })

        this.peer.on('disconnected', (e) => {
            this.online.value = false;
        })

        this.peer.on('close', () => {
            console.log('close')
        })

        joinedAudio.play();
    }

    public static async setAudioSteam() {
        if(!this.online.value) {
            return;
        }
        this.stream = await this.getMediaVoice();

        this.otherIDs.forEach(id => {
            this.mediaConnects[id] = this.peer.call(id, this.stream)
        })


        this.peer.on('call', (call) => {
            call.answer(this.stream);
            call.on('stream', remoteStream => {
                this.playStream(call.peer, remoteStream);
            });
        })
    }

    private static playStream(peerId: string, stream: MediaStream) {
        const player = this.players[peerId] || getVideo();

        player.srcObject = stream;

        player.autoplay = true;

        this.players[peerId] = player
    }

    private static async removeAudioStream() {
        this.stream?.getTracks().map(track => track.stop())
        Object.values(this.players).forEach(player => {
            player.currentTime = 0;
            player.srcObject = null;
            player.remove()
        })
        this.players = {}
    }


    private static async getMediaVoice() {
        return navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    }

    private static disconnect() {
        if(!this.online.value) {
            return;
        }
        Object.values(this.mediaConnects).forEach(connect => {
            connect.close();
        })
        this.peer.disconnect();
        this.removeAudioStream();
    }
}

watch(() => ServiceConnect.onlineUsers, Voice.setAudioSteam.bind(Voice))
