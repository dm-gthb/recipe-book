import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface IAuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWbhu9JPaOihuo6unUZ3LnyaweCI-1xXA';
  readonly loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWbhu9JPaOihuo6unUZ3LnyaweCI-1xXA';
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: number;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  signup(email: string, password: string) {
    const params = { email, password, returnSecureToken: true };
    return this.http.post<IAuthResponseData>(this.signupUrl, params)
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          const { email, localId, idToken, expiresIn } = responseData;
          this.handleAuth(email, localId, idToken, +expiresIn);
        })
      );
  }

  login(email: string, password: string) {
    const params = { email, password, returnSecureToken: true };
    return this.http.post<IAuthResponseData>(this.loginUrl, params)
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          const { email, localId, idToken, expiresIn } = responseData;
          this.handleAuth(email, localId, idToken, +expiresIn);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const { email, id, _token, _tokenExpirationDate } = userData;
    const loadedUser = new User(email, id, _token, new Date(_tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = window.setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string;
    if (errorRes.error || errorRes.error.error) {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'this email is already taken';
          break;
        default:
          errorMessage = 'unknown error';
      }
    }
    return throwError(errorMessage);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
