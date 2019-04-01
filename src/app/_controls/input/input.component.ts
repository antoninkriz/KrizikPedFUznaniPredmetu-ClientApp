import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'control-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputControl {
  @Input() formControlName: string;
  @Input() formGroup: FormGroup;

  @Input() type: string = "text";
  @Input() validation: string = null;

  @Input() placeholder: string = null;

  @Input() pattern: RegExp = /.*/;
  @Input() maxLen: number = null;
  @Input() minLen: number = null;

  @Input() classes: string = null;
  @Input() disable: boolean = false;
  @Input() required: boolean = false;

  @Input() value: string = '';
  @Input() keyup: Function = () => {};

  public valid: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) {
    if (!this.formGroup || !this.formControlName) {
      this.formControlName = "inp" + Math.ceil(Math.random() * 10000);
      this.formGroup = this.formBuilder.group({[this.formControlName]: ['', null]});
    }
  }

  public onChange(value: string) {
    this.valid = this.validate(value) && value.length > 0;
    this.value = value;
    this.keyup(value);
  }

  private validate(value: string): boolean {
    let rgx: RegExp = this.pattern ? this.pattern : /.*/;

    switch (this.validation) {
      case "email":
        rgx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        break;
      case "phone":
        rgx = /^(\+?[0-9]{1,3} ?)?([0-9]{3} ?){3}$/;
        break;
      case "number":
        rgx = /^[0-9]*$/;
        break;
    }

    return !!value.match(rgx);
  }
}
