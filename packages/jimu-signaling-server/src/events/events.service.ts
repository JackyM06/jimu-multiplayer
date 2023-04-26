import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ServerEmitType, UserType } from 'src/config/events';
import { getUuid } from 'src/utils';
import {
  IUserInfo,
  IUserOverview,
  IEditorInfo,
  IElementUnionOperation,
} from './types';
import { get, set } from 'lodash';
import { Store } from 'src/store';

@Injectable()
export class EventsService {
  get clients() {
    return Object.keys(Store.playerInfo);
  }

  get masterClient() {
    return Object.values(Store.clientSockets).find((k) => {
      return this.getUserInfo(k).type === UserType.MASTER;
    });
  }

  get helperClients() {
    return Object.values(Store.clientSockets).filter((k) => {
      return this.getUserInfo(k).type === UserType.MASTER;
    });
  }

  get userOverview(): IUserOverview {
    return {
      total: this.clients.length,
      users: Object.values(Store.playerInfo).map((e) => e.userInfo),
    };
  }

  private setUserInfo(client: Socket, userInfo: IUserInfo): void {
    set(Store.playerInfo, `${[client.id]}.userInfo`, userInfo);
  }

  private setEditorInfo(client: Socket, editorInfo: IEditorInfo): void {
    set(Store.playerInfo, `${[client.id]}.editorInfo`, editorInfo);
  }

  private getUserInfo(client: Socket) {
    return get(Store.playerInfo[client.id], 'userInfo');
  }

  private getEditorInfo(client: Socket) {
    return get(Store.playerInfo[client.id], 'editorInfo');
  }

  getUserType() {
    if (this.masterClient?.connected) {
      return UserType.HELPER;
    }
    return UserType.MASTER;
  }

  joined(client: Socket) {
    const userInfo = { uuid: getUuid(), type: this.getUserType() };
    this.sendHelperOffer(client, userInfo);
  }

  unjoined(client: Socket) {
    client.broadcast.emit(
      ServerEmitType.PLAYER_UNJOINED,
      this.getUserInfo(client).uuid,
    );
    Reflect.deleteProperty(Store.playerInfo, client.id);
    Reflect.deleteProperty(Store.clientSockets, client.id);
  }

  userRefresh(server: Socket) {
    server.emit(ServerEmitType.USER_REFRESH, this.userOverview);
  }

  relayOffer(client: Socket, offerSdp) {
    client.broadcast.emit(ServerEmitType.OFFER, offerSdp);
  }

  relayAnswer(client: Socket, answerSdp) {
    client.broadcast.emit(ServerEmitType.ANSWER, answerSdp);
  }

  setActiveEid(client: Socket, eid: string) {
    this.setEditorInfo(client, { activeEid: eid });
    client.broadcast.emit(
      ServerEmitType.PLAYER_REFRESH,
      Store.playerInfo[client.id],
    );
  }

  setElementOperation(
    client: Socket,
    operations: IElementUnionOperation[],
    record = true,
  ) {
    client.broadcast.emit(ServerEmitType.ELEMENT_OPERATION_UPDATE, operations);

    record && Store.pushOperation(operations);
  }

  sendHelperOffer(client: Socket, userInfo: IUserInfo) {
    if (Store.masterClient) {
      Store.masterClient.emit(
        ServerEmitType.RELAY_HELPER_OFFER,
        userInfo,
        (pass: boolean) => {
          client.emit(ServerEmitType.RELAY_MASTER_ANSWER, pass);
          pass && this.realJoined(client);
        },
      );
      return;
    }
    this.realJoined(client);
  }

  realJoined(client: Socket) {
    this.setUserInfo(client, { uuid: getUuid(), type: this.getUserType() });
    Store.clientSockets[client.id] = client;
    client.emit(ServerEmitType.JOINED, this.getUserInfo(client));

    this.setElementOperation(client, Store.elementOperationQueue, false);
  }
}
