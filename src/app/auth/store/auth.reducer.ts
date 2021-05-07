import * as AuthActions from './auth.actions';
import {User} from '../auth.model';
import {AUTH_LOGOUT} from './auth.actions';

export interface IAuthState {
  user: User;
  loading: boolean;
  error: null | '';
}

const initialState = {
  user: null,
  error: null,
  loading: false,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions): IAuthState {
  switch (action.type) {
    case AuthActions.AUTH_LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case AuthActions.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        user: new User(action.payload.email, action.payload.id, action.payload.token, action.payload.tokenExpirationIn),
        loading: false
      };
    case AuthActions.AUTH_LOGIN_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case AuthActions.AUTH_LOGOUT:
      return {
        ...state,
        user: null,
      };

    default: return state;
  }
}

