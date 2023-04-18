import { Peer } from "peerjs";
import { ServiceConnect } from '@editor/models/service'
import { ref, watch } from "vue";

const joinedAudio = new Audio('https://cdnfile.corp.kuaishou.com/kc/files/a/doodle_editor/multiplayer/joined.mp3')
const unjoinedAudio = new Audio('https://cdnfile.corp.kuaishou.com/kc/files/a/doodle_editor/multiplayer/unjoined.mp3')


export class Voice {
    public static get opened() {
        return this.online.value
    }


    public static close() {
        this.disconnect()
    }

    private static peer: Peer;

    private static stream: MediaStream;
    
    private static online = ref(false);

    private static get otherIDs() {
        return ServiceConnect.onlineUsers.filter(e => e !== ServiceConnect.username);
    }

    public static open() {
        this.peer = new Peer(ServiceConnect.username, {
            host: location.hostname,
            ...(location.hostname === 'localhost' ? {port: 9000} : {}),
            path: '/peer'
        });
        this.peer.on('open', (e) => {
            this.online.value = true;
            this.connect();
        })

        this.peer.on('connection', (e) => {
            console.log('connection', e, this.online.value);
            this.setAudioSteam()
        })

        this.peer.on('disconnected', (e) => {
            unjoinedAudio.play();
            this.online.value = false;
            
        })

    }

    public static async connect() {
        if(!this.online.value) {
            return;
        }
         this.otherIDs.map(e => {
            return this.peer.connect(e)
        })
        joinedAudio.play();
    }

    private static async setAudioSteam() {
        this.stream = await this.getMediaVoice();

        this.otherIDs.forEach(id => {
            this.peer.call(id, this.stream);
        })

        this.peer.on('call', (call) => {
            call.answer(this.stream);
            call.on('stream', function(remoteStream) {

              const audio = new Audio()
              audio.srcObject = remoteStream;
              audio.play();
            });
        })
    }

    private static async removeAudioStream() {
        this.stream?.getTracks().map(track => track.stop())
    }


    private static async getMediaVoice() {
        return navigator.mediaDevices.getUserMedia({ audio: true })
    }

    private static disconnect() {
        if(!this.online.value) {
            return;
        }
        this.peer.disconnect();
        this.peer.destroy();
        this.removeAudioStream();
    }
}

watch(() => ServiceConnect.onlineUsers, Voice.connect.bind(Voice))
