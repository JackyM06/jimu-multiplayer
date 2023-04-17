export interface IUserOverview {
  total: number;
  uuids: string[];
}

export interface IUserInfo {
  uuid: string;
}

export interface IEditorInfo {
  activeEid?: string;
}

export interface IPlayerInfo {
  userInfo: IUserInfo;
  editorInfo: IEditorInfo;
}

export interface IElementPropInfo {
  eid: string;
  path: string;
  value: unknown;
}
