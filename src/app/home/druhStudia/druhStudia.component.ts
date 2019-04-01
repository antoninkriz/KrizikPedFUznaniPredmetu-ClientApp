import {Component, Input} from '@angular/core';
import {DruhStudia} from "../home.component";

@Component({
  selector: 'list-druhStudia',
  templateUrl: './druhStudia.component.html'
})
export class DruhStudiaComponent {
  @Input() public readonly data: DruhStudia;
}
