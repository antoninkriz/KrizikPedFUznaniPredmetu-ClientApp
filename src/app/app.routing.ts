import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from "./_guards/auth.guard";

import {HomeComponent} from "./home/home.component";
import {CredentialsComponent} from "./credentials/credentials.component";
import {TemplateComponent} from "./template/template.component";
import {UserComponent} from "./user/user.component";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'print',
    component: TemplateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: CredentialsComponent,
    data: {type: 'login'}
  },
  {
    path: 'register',
    component: CredentialsComponent,
    data: {type: 'register'}
  },
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
