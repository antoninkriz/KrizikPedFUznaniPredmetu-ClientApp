import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

import {AuthenticationService} from "../_services/authentication.service";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  private message = {
    update: {
      Success: false,
      Message: null
    },
    password: {
      Success: false,
      Message: null
    }
  };

  private updateForm: FormGroup;
  private passwordForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private userService: UserService
  ) {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      student: ['', Validators.pattern('^[0-9]+$')],
      phone: ['', Validators.pattern('^(\\+?[0-9]{1,3} ?)?([0-9]{3} ?){3}$')],
      email: ['', Validators.email]
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    });

    this.userService.getCurrent().subscribe(u => {
      if (u != null) {
        let f = this.updateForm.controls;
        f.student.setValue(u.Code);
        f.name.setValue(u.Name);
        f.surname.setValue(u.Surname);
        f.phone.setValue(u.Phone);
        f.email.setValue(u.Email);
      } else {
        this.authenticationService.logout();
      }
    });
  }

  onSubmit(type: string) {
    switch (type) {
      case "update":
        // stop here if form is invalid
        if (this.updateForm.invalid) {
          return;
        }

        let u = this.updateForm.controls;

        this.authenticationService.update(u.name.value, u.surname.value, u.student.value, u.phone.value, u.email.value)
          .pipe(first())
          .subscribe(data => {
            this.message.update.Success = data.Success;
            this.message.update.Message = data.Success ? null : data.Message;
          });

        break;
      case "password":
        // stop here if form is invalid
        if (this.passwordForm.invalid) {
          return;
        }

        let p = this.passwordForm.controls;
        if (p.password.value != p.passwordRepeat.value) {
          this.message.password.Success = false;
          this.message.password.Message = "Hesla se nehodují";
        }

        this.authenticationService.password(p.password.value)
          .pipe(first())
          .subscribe(data => {
            this.message.password.Success = data.Success;
            this.message.password.Message = data.Success ? null : data.Message;
          });

        break;
    }
  }

  deleteUser() {
    this.authenticationService.delete();
  }
}
