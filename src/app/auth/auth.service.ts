import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './auth.model';
import {Router} from '@angular/router';

export interface AuthResponseData {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbQ6ynwLVmQzM6ycx6HEHSlpyZgM4LCE0', {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbQ6ynwLVmQzM6ycx6HEHSlpyZgM4LCE0', {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),
      tap((response) => this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)));
  }

  autoLogin(): void {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationIn:	Date;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationIn));

    if (loadedUser.token) {
      const expirationDate = new Date(userData._tokenExpirationIn).getTime() - new Date().getTime();
      this.autoLogout(expirationDate * 100);
      this.user.next(loadedUser);
    }
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/authenticate']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  handleError(response): Observable<never> {
    const error = response?.error?.error?.message ?? 'Unknown error';

    return throwError(error);
  }

  handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
    this.autoLogout(expirationDate.getTime());
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
