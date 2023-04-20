import { get } from 'lodash';
import { Socket } from 'socket.io';
import { UserType } from 'src/config/events';
import { IPlayerInfo } from 'src/events/types';

export class Store {
  public static playerInfo: Record<string, IPlayerInfo> = {};
  public static clientSockets: Record<string, Socket> = {};

  public static get masterClient() {
    return Object.values(Store.clientSockets).find((k) => {
      return this.getUserInfo(k).type === UserType.MASTER;
    });
  }

  public static get helperClients() {
    return Object.values(Store.clientSockets).filter((k) => {
      return this.getUserInfo(k).type === UserType.MASTER;
    });
  }

  public static getUserInfo(client: Socket) {
    return get(Store.playerInfo[client.id], 'userInfo');
  }
}
