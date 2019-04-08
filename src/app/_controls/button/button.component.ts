import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'control-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonControl implements OnInit{
  @Input() formGroup: FormGroup;

  @Input() type: string = "button";

  @Input() text: string = "OK";

  @Input() classes: string = null;
  @Input() disable: boolean = false;


  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    if (!this.formGroup) {
      let fakeName = "inp" + Math.ceil(Math.random() * 10000);
      this.formGroup = this.formBuilder.group({[fakeName]: ['', null]});
    }
  }
}
