import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent {
  type: string = 'login';

  constructor(route: ActivatedRoute) {
    this.type = route.data['type'];
  }
}
