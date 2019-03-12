import {Katedra, DruhStudia, Obor, Predmet} from "../home/home.component";

export class KatedryResponse {
  Success: string;
  Katedry: Katedra[];
}

export class DruhyStduiaResponse {
  Success: string;
  DruhyStudia: DruhStudia[];
}

export class OboryResponse {
  Success: string;
  Obory: Obor[];
}

export class PredmetyResponse {
  Success: string;
  Predmety: Predmet[];
}
