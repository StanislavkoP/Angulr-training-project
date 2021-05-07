import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of } from 'rxjs';
import {catchError, switchMap, map, tap} from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

export interface AuthResponseData {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId: string;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.AUTH_LOGIN_START),
    switchMap((authData: AuthActions.AuthLoginStart) => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbQ6ynwLVmQzM6ycx6HEHSlpyZgM4LCE0', {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      })
        .pipe(
          catchError(error => {
            return of(new AuthActions.AuthLoginFailed(error));
          }),
          map((responseData: AuthResponseData) => {
            return new AuthActions.AuthLoginSuccess({
              email: responseData.email,
              id: responseData.localId,
              token: responseData.idToken,
              tokenExpirationIn: +responseData.expiresIn
            });
          })
       );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTH_LOGIN_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(private  actions$: Actions, private http: HttpClient, private router: Router) {}
}
