import {Component} from '@angular/core';
import {Router} from "@angular/router";

import {TemplateData} from "../_models/templateData";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {
  private date: string;
  private templ: TemplateData;
  private templPredmetName: string[];

  constructor(
    private router: Router
  ) {
    let storageData = localStorage.getItem("templateData");

    if (storageData) {
      let d: Date = new Date();
      this.date = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
      this.templ = <TemplateData>JSON.parse(storageData);

      let s = this.templ.PredmetNazev;

      if (s.length > 50) {
        let middle = Math.floor(s.length / 2);
        let before = s.lastIndexOf(' ', middle);
        let after = s.indexOf(' ', middle + 1);

        if (before == -1 || (after != -1 && middle - before >= after - middle))
          middle = after;
        else
          middle = before;

        this.templPredmetName = [s.substr(0, middle), s.substr(middle + 1)];
      } else {
        this.templPredmetName = [s];
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
