import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";

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
    route.data.pipe(map(d => {
      this.credentialsType = d['type'];
    }));
  }

  switchType(credType: string) {
    history.pushState(null, null, `/${credType}`);
    this.credentialsType = credType;
  }
}
