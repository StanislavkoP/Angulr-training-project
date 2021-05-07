import { Action } from '@ngrx/store';

export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export class AuthLoginStart implements Action {
  type = AUTH_LOGIN_START;

  constructor(public payload: {
    email: string,
    password: string,
  }) {}
}

export class AuthLoginSuccess implements Action {
  type = AUTH_LOGIN_SUCCESS;

  constructor(public payload: {
     email: string,
     id: string,
     token: string,
     tokenExpirationIn: number
  }) {}
}

export class AuthLoginFailed implements Action {
  type = AUTH_LOGIN_FAILED;

  constructor(public payload: string) {}
}

export class AuthLogout implements Action {
  type = AUTH_LOGOUT;

  constructor(public payload) {}
}

export type AuthActions = AuthLoginStart | AuthLoginSuccess | AuthLoginFailed | AuthLogout;
