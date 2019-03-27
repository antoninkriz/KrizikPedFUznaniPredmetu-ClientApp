import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";

import {AuthenticationService} from "../../_services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../loginRegister.component.scss']
})
export class LoginComponent {
  @Input() disabled: boolean;

  loginForm: FormGroup;

  error: string = '';
  loading: boolean = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let c = this.loginForm.controls;

    this.authenticationService.login(c.email.value, c.password.value)
      .pipe(first())
      .subscribe(data => {
          if (data.Success) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.error = data.Message;
          }
        });
  }
}

