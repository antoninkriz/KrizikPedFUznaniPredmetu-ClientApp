import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {routing} from "./app.routing";

import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {AppComponent} from './app.component';
import {NavMenuComponent} from "./nav-menu/nav-menu.component";
import {HomeComponent} from "./home/home.component";
import {CounterComponent} from "./counter/counter.component";
import {FetchDataComponent} from "./fetch-data/fetch-data.component";
import {CredentialsComponent} from "./credentials/credentials.component";
import {RegisterComponent} from "./credentials/register/register.component";
import {LoginComponent} from "./credentials/login/login.component";
import {DruhStudiaComponent} from "./home/druhStudia/druhStudia.component";
import {KatedraComponent} from "./home/katedra/katedra.component";
import {OborComponent} from "./home/obor/obor.component";
import {PredmetComponent} from "./home/predmet/predmet.component";
import {TemplateComponent} from "./template/template.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CredentialsComponent,
    RegisterComponent,
    LoginComponent,
    KatedraComponent,
    DruhStudiaComponent,
    OborComponent,
    PredmetComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
