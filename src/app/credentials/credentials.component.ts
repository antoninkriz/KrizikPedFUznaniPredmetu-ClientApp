import {Component} from '@angular/core';
import {ActivatedRoute, Data, Router} from "@angular/router";

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent {
  public credentialsType: string = 'login';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    route.data.subscribe(d => {
      this.credentialsType = d['type'];
    });
  }

  switchType(credType: string) {
    history.pushState(null, null, `/${credType}`);
    this.credentialsType = credType;
  }
}
