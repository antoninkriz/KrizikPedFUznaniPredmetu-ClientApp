import {Component} from '@angular/core';
import {Config} from "../config";
import {HttpClient} from '@angular/common/http';
import {DruhyStduiaResponse, KatedryResponse, OboryResponse, PredmetyResponse} from "../_models/searchResponses";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private data: Data = new Data();
  private complete: boolean = false;

  private static readonly types: string[] = ['katedra', 'druhStudia', 'obor', 'predmet'];
  private currentType: string = this.loadTypes[0];
  get loadTypes(): string[] {
    return HomeComponent.types;
  }

  get placeholders(): object {
    return {
      katedra: "Vyhledejte kód katedry",
      druhStudia: "Vyberte druh studia",
      obor: "Vyhledejte obor",
      predmet: "Vyhledejte předmět"
    };
  };

  get titles(): object {
    return {
      katedra: "Katedra",
      druhStudia: "Druh studia",
      obor: "Obor",
      predmet: "Předmět"
    }
  };

  private selected = {
    katedra: null,
    druhStudia: null,
    obor: null,
    predmet: null
  };
  get getSelected() : object {
    return this.selected;
  }


  constructor(
    private http: HttpClient
  ) {
  }

  private setCurrentType(type: string) {
    this.currentType = type;
  }

  private listSelect(type: string, obj: IType) {
    let i = this.loadTypes.indexOf(type);

    this.selected = {
      katedra: i == 0 ? obj : this.selected.katedra,
      druhStudia: i == 1 ? obj : this.selected.druhStudia,
      obor: i == 2 ? obj : this.selected.obor,
      predmet: i == 3 ? obj : this.selected.predmet
    };

    if (i != 3) {
      this.currentType = this.loadTypes[this.loadTypes.indexOf(type) + 1];
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  private search(type: string, value: string) {
    this.http.post(`${Config.API_URL}/data/${type}`, type == this.loadTypes[0] ? {
      // katedra
      searchText: value
    } : type == this.loadTypes[1] ? {
      // druh studia
      searchText: value,
      katedraId: this.selected.katedra.Id
    } : type == this.loadTypes[2] ? {
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
        case this.loadTypes[0]:
          this.data.katedra = (<KatedryResponse>result).Katedry;
          break;
        case this.loadTypes[2]:
          this.data.druhStudia = (<DruhyStduiaResponse>result).DruhyStudia;
          break;
        case this.loadTypes[3]:
          this.data.obor = (<OboryResponse>result).Obory;
          break;
        case this.loadTypes[4]:
          this.data.predmet = (<PredmetyResponse>result).Predmety;
          break;
      }
    }, error => console.error(error));
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
  Code: string;
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
}

export class Predmet implements IType {
  Id: string;
  Code: string;
  Name: string;
  Zkouska: string;
  Credits: number;
}
