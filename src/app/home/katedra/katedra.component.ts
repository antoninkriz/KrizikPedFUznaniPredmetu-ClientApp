import {Component, Input} from '@angular/core';
import {Katedra} from "../home.component";

@Component({
  selector: 'list-katedra',
  templateUrl: './katedra.component.html'
})
export class KatedraComponent {
  @Input() private readonly data: Katedra;
  get inputData() {
    return this.data;
  }
}
