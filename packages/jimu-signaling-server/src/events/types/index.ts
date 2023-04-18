import { ElementOperationType } from 'src/config/events';

export interface IUserOverview {
  total: number;
  uuids: string[];
}

export interface IUserInfo {
  uuid: string;
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
