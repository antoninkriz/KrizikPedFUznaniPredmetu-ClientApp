import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Config} from "../config";
import {Token} from "../_models/token";
import {TokenResponse} from "../_models/tokenResponse";
import {BasicResponse} from "../_models/basicResponse";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<Token>;
  public currentToken: Observable<Token>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentToken')));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get isLoggedIn(): boolean {
    const currUser = this.currentTokenValue;
    return currUser && currUser.Token && currUser.Expire > Math.floor(Date.now() / 1000);
  }

  public get currentTokenValue(): Token {
    return this.currentTokenSubject.value;
  }

  private setToken(expire: number, token: string, refresher?: number): Token {
    let t = new Token();
    t.Expire = expire;
    t.Token = token;
    t.Refresh = refresher ?
      refresher : setInterval(() => {
        let currentToken = this.currentTokenValue;

        this.http.get<TokenResponse>(`${Config.API_URL}/user/refresh`).pipe(map(resp => {
          if (resp && resp.Success) {
            this.setToken(
              resp.Expires,
              resp.Token,
              currentToken.Refresh
            );
          }
        }));
      }, Config.TOKEN_REFRESH_TIME);

    this.currentTokenSubject.next(t);
    localStorage.setItem('currentToken', JSON.stringify(t));

    return t;
  }

  register(name: string, surname: string, student: number, phone: string, email: string, password: string) {
    return this.http.post<TokenResponse>(`${Config.API_URL}/user/register`, {
      code: student,
      email: email,
      name: name,
      surname: surname,
      phone: phone,
      password: password
    }).pipe(map(resp => {
      // register successful if there's a jwt token in the response
      if (resp && resp.Success) {
        this.setToken(
          resp.Expires,
          resp.Token
        );
      }

      return resp;
    }));
  }

  login(username: string, password: string) {
    return this.http.post<TokenResponse>(`${Config.API_URL}/user/login`, {
      email: username,
      password: password
    }).pipe(map(resp => {
      // login successful if there's a jwt token in the response
      if (resp && resp.Success) {
        this.setToken(
          resp.Expires,
          resp.Token
        );
      }

      return resp;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    if (this.currentTokenValue && this.currentTokenValue.Refresh)
      clearInterval(this.currentTokenValue.Refresh);

    localStorage.removeItem('currentToken');
    this.currentTokenSubject.next(null);
  }

  update(name: string, surname: string, student: number, phone: string, email: string) {
    return this.http.post<BasicResponse>(`${Config.API_URL}/user/update`, {
      code: student,
      email: email,
      name: name,
      surname: surname,
      phone: phone
    }).pipe(map(resp => {
      return resp;
    }));
  }

  password(password: string) {
    return this.http.post<BasicResponse>(`${Config.API_URL}/user/password`, {
      password: password
    }).pipe(map(resp => {
      return resp;
    }));
  }

  delete() {
    return this.http.get(`${Config.API_URL}/user/delete`)
      .pipe(map(() => this.logout()));
  }
}
