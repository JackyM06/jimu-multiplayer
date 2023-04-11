export enum ServerEmitType {
  JOINED = 'JOINED',
  USER_REFRESH = 'USER_REFRESH', // USER和PLAYER的区别在于是否携带编辑器数据
  PLAYER_REFRESH = 'PLAYER_REFRESH',
  PLAYER_UNJOINED = 'PLAYER_UNJOINED',
  OFFER = 'OFFER',
  ANSWER = 'ANSWER',
}

export enum ServerSubscriptionType {
  // WebRTC握手（暂不启用）
  RELAY_ANSWER = 'RELAY_ANSWER',
  RELAY_OFFER = 'RELAY_OFFER',
  // Multiplayer
  SET_ACTIVE_EID = 'SET_ACTIVE_EID',
}
