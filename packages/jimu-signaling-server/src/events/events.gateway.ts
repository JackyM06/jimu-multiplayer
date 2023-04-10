import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';
import { getUuid, sleep } from 'src/utils';

@WebSocketGateway(6001, {
  transports: ['polling', 'websocket'],
  path: '/signaling-socket/',
  cors: true,
})
export class EventsGateway {
  @WebSocketServer() server: Socket;

  private clients: Socket[] = [];

  async handleConnection(client: Socket) {
    this.clients.push(client);
    await sleep(300);
    client.emit('joined', {
      uuid: getUuid(),
    });

    client.emit('userRefresh', {
      total: this.clients.length,
    });

    client.broadcast.emit('userRefresh', {
      total: this.clients.length,
    });
  }

  async handleDisconnect(client: Socket) {
    this.clients = this.clients.filter((e) => e !== client);
    await sleep(300);

    client.broadcast.emit('userRefresh', {
      total: this.clients.length,
    });
  }

  @SubscribeMessage('offer')
  offer(@MessageBody() offerSdp: any, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('offer', offerSdp);
  }

  @SubscribeMessage('answer')
  answer(@MessageBody() answerSdp: any, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('answer', answerSdp);
  }
}
