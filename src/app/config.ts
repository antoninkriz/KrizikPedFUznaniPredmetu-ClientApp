import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  public static API_URL: string = `${document.getElementsByTagName('base')[0].href}api`;
  public static TOKEN_REFRESH_TIME: number = 30000;
}
