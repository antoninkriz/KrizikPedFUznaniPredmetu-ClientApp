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
import {CredentialsComponent} from "./credentials/credentials.component";
import {RegisterComponent} from "./credentials/register/register.component";
import {LoginComponent} from "./credentials/login/login.component";
import {DruhStudiaComponent} from "./home/druhStudia/druhStudia.component";
import {KatedraComponent} from "./home/katedra/katedra.component";
import {OborComponent} from "./home/obor/obor.component";
import {PredmetComponent} from "./home/predmet/predmet.component";
import {TemplateComponent} from "./template/template.component";
import {UserComponent} from "./user/user.component";
import {InputControl as InputComponent} from "./_controls/input/input.component";
import {ButtonControl as ButtonComponent} from "./_controls/button/button.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CredentialsComponent,
    RegisterComponent,
    LoginComponent,
    KatedraComponent,
    DruhStudiaComponent,
    OborComponent,
    PredmetComponent,
    TemplateComponent,
    UserComponent,
    InputComponent,
    ButtonComponent
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
