import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'control-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputControl implements OnInit {
  @Input() formControlName: string;
  @Input() formGroup: FormGroup;

  @Input() type: string = "text";
  @Input() validation: string = null;

  @Input() placeholder: string = null;

  @Input() maxLen: number = null;
  @Input() minLen: number = null;

  @Input() classes: string = null;
  @Input() disable: boolean = false;
  @Input() required: boolean = false;

  @Input() value: string = '';
  @Input() keyup: Function = () => {
  };

  public valid: boolean;
  public pattern: RegExp = null;

  private patterns = {
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    phone: /^(\+?[0-9]{1,3} ?)?([0-9]{3} ?){3}$/,
    number: /^[0-9]*$/,
    decimal: /^[0-9]*[,.]?[0-9]*/,
    any: /.*/
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    if (!this.formGroup || !this.formControlName) {
      this.formControlName = "inp" + Math.ceil(Math.random() * 10000);
      this.formGroup = this.formBuilder.group({[this.formControlName]: ['', null]});
    }

    this.pattern = this.patterns[this.patterns.hasOwnProperty(this.validation) ? this.validation : "any"];
  }

  public onChange(value: string) {
    this.valid = this.validate(value) && value.length > 0;
    this.value = value;
    this.keyup(value);
  }

  private validate(value: string): boolean {
    return !!value.match(this.pattern);
  }
}
