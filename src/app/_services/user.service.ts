import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";

import {Config} from "../config";
import {User} from "../_models/user";
import {UserResponse} from "../_models/userResponse";

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getCurrent() {
    return this.http.get<UserResponse>(`${Config.API_URL}/users`)
      .pipe(map(resp => {
        let u = new User();

        if (resp && resp.Success) {
          u.Code = resp.Code;
          u.Email = resp.Email;
          u.Name = resp.Name;
          u.Surname = resp.Surname;
          u.Phone = resp.Phone;
        }

        return u;
      }));
  }
}
