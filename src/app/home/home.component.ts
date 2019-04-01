import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';

import {Config} from "../config";
import {UserService} from "../_services/user.service";
import {AuthenticationService} from "../_services/authentication.service";
import {DruhyStduiaResponse, KatedryResponse, OboryResponse, PredmetyResponse} from "../_models/searchResponses";
import {TemplateData} from "../_models/templateData";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public component = HomeComponent;

  static loadTypes: string[] = ['katedra', 'druhStudia', 'obor', 'predmet'];
  static titles: object = {
    [HomeComponent.loadTypes[0]]: "Katedra",
    [HomeComponent.loadTypes[1]]: "Druh studia",
    [HomeComponent.loadTypes[2]]: "Obor",
    [HomeComponent.loadTypes[3]]: "Předmět"
  };
  static inputPlaceholders: object = {
    [HomeComponent.loadTypes[0]]: "Vyhledejte kód katedry",
    [HomeComponent.loadTypes[1]]: "Vyberte druh studia",
    [HomeComponent.loadTypes[2]]: "Vyhledejte obor",
    [HomeComponent.loadTypes[3]]: "Vyhledejte předmět"
  };

  private formComplete: boolean = false;
  private currentType: string = HomeComponent.loadTypes[0];
  private dataList: Data = new Data();
  private selected = {
    katedra: null,
    druhStudia: null,
    obor: null,
    predmet: null
  };

  private inputValues = {
    katedra: "",
    druhStudia: "",
    obor: "",
    predmet: ""
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private authenticationService: AuthenticationService,
  ) {
  }

  private listSelect(type: string, obj: IType) {
    let i = HomeComponent.loadTypes.indexOf(type);

    this.selected = {
      katedra: i == 0 ? obj : this.selected.katedra,
      druhStudia: i == 1 ? obj : i < 1 ? null : this.selected.druhStudia,
      obor: i == 2 ? obj : i < 2 ? null : this.selected.obor,
      predmet: i == 3 ? obj : null
    };

    if (i < 3) {
      this.dataList.predmet = [];
      this.inputValues.predmet = "";

      if (i < 2) {
        this.dataList.obor = [];
        this.inputValues.obor = "";

        if (i < 1) {
          this.dataList.druhStudia = [];
          this.inputValues.druhStudia = "";
        }
      }
    }

    if (i != 3) {
      let loadTypeIndex: number = HomeComponent.loadTypes.indexOf(type) + 1;
      this.currentType = HomeComponent.loadTypes[loadTypeIndex];

      this.formComplete = false;
    } else {
      this.formComplete = true;
    }
  }

  private searchFnc = {
    [HomeComponent.loadTypes[0]]: (s) => this.search(HomeComponent.loadTypes[0], s),
    [HomeComponent.loadTypes[1]]: (s) => this.search(HomeComponent.loadTypes[1], s),
    [HomeComponent.loadTypes[2]]: (s) => this.search(HomeComponent.loadTypes[2], s),
    [HomeComponent.loadTypes[3]]: (s) => this.search(HomeComponent.loadTypes[3], s)
  };

  private search(type: string, value: string) {
    this.inputValues[type] = value;

    this.http.post(`${Config.API_URL}/data/${type}`, type == HomeComponent.loadTypes[0] ? {
      // katedra
      searchText: value
    } : type == HomeComponent.loadTypes[1] ? {
      // druh studia
      searchText: value,
      katedraId: this.selected.katedra.Id
    } : type == HomeComponent.loadTypes[2] ? {
      // obor
      searchText: value,
      katedraId: this.selected.katedra.Id,
      druhStudiaId: this.selected.druhStudia.Id
    } : {
      // predmet
      searchText: value,
      oborId: this.selected.obor.Id
    }).subscribe(result => {
      switch (type) {
        case HomeComponent.loadTypes[0]:
          this.dataList.katedra = (<KatedryResponse>result).Katedry;
          break;
        case HomeComponent.loadTypes[1]:
          this.dataList.druhStudia = (<DruhyStduiaResponse>result).DruhyStudia;
          break;
        case HomeComponent.loadTypes[2]:
          this.dataList.obor = (<OboryResponse>result).Obory;
          break;
        case HomeComponent.loadTypes[3]:
          this.dataList.predmet = (<PredmetyResponse>result).Predmety;
          break;
      }
    }, error => console.error(error));
  }

  private complete() {
    if (this.formComplete) {
      this.userService.getCurrent().subscribe(u => {
        if (u != null) {
          let templateData = new TemplateData();
          templateData.StudentId = u.Code;
          templateData.NameSurname = `${u.Name} ${u.Surname}`;
          templateData.Phone = u.Phone;
          templateData.Email = u.Email;
          templateData.Katedra = this.selected.katedra.Name;
          templateData.DruhStudia = this.selected.druhStudia.Code;
          templateData.Obor = this.selected.obor.Code;
          templateData.Forma = this.selected.obor.StudyForm ? "KS" : "DS";
          templateData.PredmetKod = this.selected.predmet.Code;
          templateData.PredmetNazev = this.selected.predmet.Name;
          templateData.Ukonceno = this.selected.predmet.Zkouska;

          localStorage.setItem("templateData", JSON.stringify(templateData));

          this.router.navigate(['/print']);
        } else {
          this.authenticationService.logout();
        }
      });
    }
  }
}

class Data {
  katedra: Katedra[] = [];
  druhStudia: DruhStudia[] = [];
  obor: Obor[] = [];
  predmet: Predmet[] = [];
}

interface IType {
}

export class Katedra implements IType {
  Id: string;
  Name: string;
}

export class DruhStudia implements IType {
  Id: string;
  Code: string;
  Name: string;
}

export class Obor implements IType {
  Id: string;
  Code: string;
  Name: string;
  YearFrom: number;
  YearTo: number;
  StudyForm: boolean;
}

export class Predmet implements IType {
  Id: string;
  Code: string;
  Name: string;
  Zkouska: string;
  Credits: number;
}
