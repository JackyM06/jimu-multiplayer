import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ServerEmitType } from 'src/config/events';
import { getUuid } from 'src/utils';
import {
  IUserInfo,
  IUserOverview,
  IEditorInfo,
  IPlayerInfo,
  IElementPropInfo,
} from './types';
import { get, set } from 'lodash';

@Injectable()
export class EventsService {
  private playerInfo: Record<string, IPlayerInfo> = {};

  get clients() {
    return Object.keys(this.playerInfo);
  }

  get userOverview(): IUserOverview {
    return {
      total: this.clients.length,
      uuids: Object.values(this.playerInfo).map((e) => e.userInfo.uuid),
    };
  }

  private setUserInfo(client: Socket, userInfo: IUserInfo): void {
    set(this.playerInfo, `${[client.id]}.userInfo`, userInfo);
  }

  private setEditorInfo(client: Socket, editorInfo: IEditorInfo): void {
    set(this.playerInfo, `${[client.id]}.editorInfo`, editorInfo);
  }

  private getUserInfo(client: Socket) {
    return get(this.playerInfo[client.id], 'userInfo');
  }

  private getEditorInfo(client: Socket) {
    return get(this.playerInfo[client.id], 'editorInfo');
  }

  joined(client: Socket) {
    this.setUserInfo(client, { uuid: getUuid() });
    client.emit(ServerEmitType.JOINED, this.getUserInfo(client));
  }

  unjoined(client: Socket) {
    client.broadcast.emit(
      ServerEmitType.PLAYER_UNJOINED,
      this.getUserInfo(client).uuid,
    );
    Reflect.deleteProperty(this.playerInfo, client.id);
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
      this.playerInfo[client.id],
    );
  }

  setElementProp(client: Socket, propInfos: IElementPropInfo[]) {
    client.broadcast.emit(ServerEmitType.ELEMENT_PROP_CHANGE, propInfos);
  }
}
