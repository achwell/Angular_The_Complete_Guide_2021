import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {throwError, BehaviorSubject} from 'rxjs';

import {User} from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(email: string, password: string) {
    return this.callBackend('https://identitytoolkit.googleapis.com/v1/accounts:signUp', email, password);
  }

  login(email: string, password: string) {
    return this.callBackend('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword', email, password);
  }

  autoLogin() {
    const userData: { email: string, id: string, _token: string, _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expiresIn = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expiresIn);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth']);
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private callBackend(url: string, email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        url + '?key=AIzaSyDU74YAWQsEfH48QIwrFKLhOaff97CVWA4',
        {email: email, password: password, returnSecureToken: true}
      )
      .pipe(
        catchError(AuthService.handleError),
        tap(resData => this.handleAuthentication(resData))
      );
  }

  private handleAuthentication(resData: AuthResponseData) {
    const expiresIn = +resData.expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private static handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
