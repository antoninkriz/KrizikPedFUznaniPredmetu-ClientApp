import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {Config} from "../config";
import {User} from "../_models/user";
import {UserResponse} from "../_models/userResponse";

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getCurrent(): Observable<User> {
    return this.http.get<UserResponse>(`${Config.API_URL}/user/load`)
      .pipe(map(resp => {
        let u: User = null;

        if (resp && resp.Success) {
          u = resp.User;
        }

        return u;
      }));
  }
}
