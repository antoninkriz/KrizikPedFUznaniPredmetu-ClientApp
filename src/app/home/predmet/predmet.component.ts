import {Component, Input} from '@angular/core';
import {Predmet} from "../home.component";

@Component({
  selector: 'list-predmet',
  templateUrl: './predmet.component.html'
})
export class PredmetComponent {
  @Input() private data: Predmet;
}
