import { ElementOperationType, UserType } from 'src/config/events';

export interface IUserOverview {
  total: number;
  users: IUserInfo[];
}

export interface IUserInfo {
  uuid: string;
  type: UserType;
}

export interface IOperationInfo {
  uuid: string;
  type: ElementOperationType;
  time: number;
}

export interface IEditorInfo {
  activeEid?: string;
}

export interface IPlayerInfo {
  userInfo: IUserInfo;
  editorInfo: IEditorInfo;
}
export interface IElementUpdate extends IOperationInfo {
  eid: string;
  path: string;
  value: unknown;
}

export interface IElementCreate extends IOperationInfo {
  schema: any;
}

export interface IElementDelete extends IOperationInfo {
  eid: string;
}

export type IElementUnionOperation = Partial<
  IElementCreate & IElementUpdate & IElementDelete
>;
