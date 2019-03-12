import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from "./_guards/auth.guard";

import {HomeComponent} from "./home/home.component";
import {CredentialsComponent} from "./credentials/credentials.component";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
