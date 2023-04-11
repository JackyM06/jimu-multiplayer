export interface IUserOverview {
  total: number;
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
