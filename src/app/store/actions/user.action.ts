import { Action } from '@ngrx/store';

const ACTIONS_NAMESPACE = 'USER_';

export const UserTypes = {
  GET_TOKEN: `${ACTIONS_NAMESPACE}GET_TOKEN`,
  GET_TOKEN_SUCCESS: `${ACTIONS_NAMESPACE}GET_TOKEN_SUCCESS`,
  GET_TOKEN_ERROR: `${ACTIONS_NAMESPACE}GET_TOKEN_ERROR`,
  GET_USER: `${ACTIONS_NAMESPACE}GET_USER`,
  GET_USER_SUCCESS: `${ACTIONS_NAMESPACE}GET_USER_SUCCESS`,
  GET_USER_ERROR: `${ACTIONS_NAMESPACE}GET_USER_ERROR`,
  GET_IMAGES: `${ACTIONS_NAMESPACE}GET_IMAGES`,
};

export class GetToken implements Action {
  public readonly type = UserTypes.GET_TOKEN;
  constructor(public payload: any) { }
}

export class GetTokenSuccess implements Action {
  public readonly type = UserTypes.GET_TOKEN_SUCCESS;
  constructor(public payload: any) { }
}

export class GetTokenError implements Action {
  public readonly type = UserTypes.GET_TOKEN_ERROR;
  constructor(public payload: any = null) { }
}

export class GetUser implements Action {
  public readonly type = UserTypes.GET_USER;
  constructor(public payload: any = null) { }
}

export class GetUserSuccess implements Action {
  public readonly type = UserTypes.GET_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class GetUserError implements Action {
  public readonly type = UserTypes.GET_USER_ERROR;
  constructor(public payload: any) {}
}

export class GetImages implements Action {
  public readonly type = UserTypes.GET_IMAGES;
  constructor(public payload: any) {}
}

export type UserActions =
| GetToken
| GetTokenSuccess
| GetTokenError
| GetUser
| GetUserSuccess
| GetUserError
| GetImages;
