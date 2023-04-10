import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';

@WebSocketGateway(6001, {
  namespace: '/signaling-socket/',
  transports: ['polling', 'websocket'],
})
export class EventsGateway {
  @WebSocketServer() server: Socket;

  private clients: Socket[] = [];

  handleConnection(client: Socket) {
    this.clients.push(client);
  }

  @SubscribeMessage('message')
  onJoin(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    client.send(`Got message: ${data}`);
    return data;
  }
}
