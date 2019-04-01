import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../loginRegister.component.scss']
})
export class RegisterComponent {
  @Input() disabled: boolean;

  public registerForm: FormGroup;

  public error: string = '';
  private readonly returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      student: ['', Validators.pattern('^[0-9]+$')],
      phone: ['', Validators.pattern('^(\\+?[0-9]{1,3} ?)?([0-9]{3} ?){3}$')],
      email: ['', Validators.email],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid)
      return;

    let c = this.registerForm.controls;

    if (c.password.value != c.passwordRepeat.value)
      this.error = "Hesla se nehodují";

    this.authenticationService.register(c.name.value, c.surname.value, c.student.value, c.phone.value, c.email.value, c.password.value)
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

