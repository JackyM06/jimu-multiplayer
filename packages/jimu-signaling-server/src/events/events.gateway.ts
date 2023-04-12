import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';

import { EventsService } from './events.service';

import { Socket } from 'socket.io';
import { ServerSubscriptionType } from 'src/config/events';
import { sleep } from 'src/utils';
import { IElementPropInfo } from './types';

@WebSocketGateway(6001, {
  transports: ['polling', 'websocket'],
  path: '/signaling-socket/',
  cors: true,
})
export class EventsGateway {
  @WebSocketServer() server: Socket;

  constructor(private readonly eventsService: EventsService) {}

  async handleConnection(client: Socket) {
    await sleep(300);
    this.eventsService.joined(client);
    this.eventsService.userRefresh(this.server);
  }

  async handleDisconnect(client: Socket) {
    await sleep(300);
    this.eventsService.unjoined(client);
    this.eventsService.userRefresh(this.server);
  }

  @SubscribeMessage(ServerSubscriptionType.RELAY_OFFER)
  relayOffer(@MessageBody() offerSdp: any, @ConnectedSocket() client: Socket) {
    this.eventsService.relayOffer(client, offerSdp);
  }

  @SubscribeMessage(ServerSubscriptionType.RELAY_ANSWER)
  relayAnswer(
    @MessageBody() answerSdp: any,
    @ConnectedSocket() client: Socket,
  ) {
    this.eventsService.relayAnswer(client, answerSdp);
  }

  @SubscribeMessage(ServerSubscriptionType.SET_ACTIVE_EID)
  setActiveEid(@MessageBody() eid: string, @ConnectedSocket() client: Socket) {
    this.eventsService.setActiveEid(client, eid);
  }

  @SubscribeMessage(ServerSubscriptionType.SET_ELEMENT_PROP)
  setElementProp(
    @MessageBody() propInfos: IElementPropInfo[],
    @ConnectedSocket() client: Socket,
  ) {
    this.eventsService.setElementProp(client, propInfos);
  }
}
