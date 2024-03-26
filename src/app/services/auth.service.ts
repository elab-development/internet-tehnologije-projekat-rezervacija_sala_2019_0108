import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, timeout } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  currentUser = this.user.asObservable();
  private tokenSubject = new BehaviorSubject<string>(null);
  

  usersToken? ;
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) { }

  get token$(): Observable<string> {
    return this.tokenSubject.asObservable();
  }

  signUp(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZNv_1p2TL1MXOFGR7JKTSlDN_jUDm9UU',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }).pipe(tap(
          resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken.trim(), +resData.expiresIn, resData.localId);
          }
        ))
      ;
  }
  logIn(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZNv_1p2TL1MXOFGR7JKTSlDN_jUDm9UU",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(tap(
        resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn, resData.localId);
        }
      )
      );
  }

  autoLogin(){
    const userData: {id: string, email: string, _token: string, _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.id, userData.email, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      let timeout = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(timeout);
    }
    this.tokenSubject.next(loadedUser.token);
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/login'])
    localStorage.removeItem("userData");
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.tokenSubject.next(null);
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number, localId: string) {
    let expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userId, email, token, expirationDate);
    console.log(token);
    this.tokenSubject.next(token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  }

  isUserAuthenticated(): boolean {
    const currentUser = this.user.value;
    return !!currentUser && !!currentUser.token;
  }

  isUserAdmin(): boolean{
    const currentUser = this.user.value;
    return currentUser.email === "admin@gmail.com";
  }
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

