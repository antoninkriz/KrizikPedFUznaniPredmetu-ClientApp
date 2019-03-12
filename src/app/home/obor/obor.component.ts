import {Component, Input} from '@angular/core';
import {Obor} from "../home.component";

@Component({
  selector: 'list-obor',
  templateUrl: './obor.component.html'
})
export class OborComponent {
  @Input() private data: Obor;
}
