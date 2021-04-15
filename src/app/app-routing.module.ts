import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { BpiuploadComponent } from './bpiupload/bpiupload.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SetusergroupComponent } from './setusergroup/setusergroup.component';
import { UploadinfoComponent } from './uploadinfo/uploadinfo.component';
import { UserComponent } from './user/user.component';
import { UsergroupComponent } from './usergroup/usergroup.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'pbiupload', component: BpiuploadComponent },
  { path: 'uploadinfo', component: UploadinfoComponent },
  { path: 'user', component: UserComponent },
  { path: 'usergroup', component: UsergroupComponent },
  { path: 'setusergroup', component: SetusergroupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
          const externalUrl = route.paramMap.get('externalUrl');
          window.open(externalUrl, '_blank');
      },
  },
  ]
})
export class AppRoutingModule { }
