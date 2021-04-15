import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RestService } from './services/rest.service';

import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {MenubarModule} from 'primeng/menubar';
import {SlideMenuModule} from 'primeng/slidemenu';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PickListModule} from 'primeng/picklist';
import {TabViewModule} from 'primeng/tabview';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';

import { FielderrorsComponent } from './fielderrors/fielderrors.component';
import { LoginComponent } from './login/login.component';
import { BpiuploadComponent } from './bpiupload/bpiupload.component';

import {HttpClient} from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { UploadinfoComponent } from './uploadinfo/uploadinfo.component';

import { ClipboardModule } from 'ngx-clipboard';

import { DeviceDetectorService } from 'ngx-device-detector';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { SetusergroupComponent } from './setusergroup/setusergroup.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UsergroupAddComponent } from './usergroup/usergroup-add/usergroup-add.component';
import { GroupDetailComponent } from './usergroup/group-detail/group-detail.component';
import { UserGroupsComponent } from './user/user-groups/user-groups.component';
import { UserAddgroupComponent } from './user/user-addgroup/user-addgroup.component';


// import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FielderrorsComponent,
    BpiuploadComponent,
    MenuComponent,
    UploadinfoComponent,
    RoleComponent,
    UserComponent,
    UsergroupComponent,
    SetusergroupComponent,
    UserAddComponent,
    UsergroupAddComponent,
    GroupDetailComponent,
    UserGroupsComponent,
    UserAddgroupComponent,
  ],
  imports: [
    ClipboardModule,
    DropdownModule,
    RadioButtonModule,
    InputSwitchModule,
    CheckboxModule,
    InputTextModule,
    DialogModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    TableModule,
    SlideMenuModule,
    MenubarModule,
    PanelModule,
    ToastModule,
    PickListModule,
    FileUploadModule,
    HttpClientModule,
    ButtonModule,
    InputTextareaModule,
    TabViewModule,
    AutoCompleteModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  //   TranslateModule.forRoot({
  //     loader: {
  //         provide: TranslateLoader,
  //         useFactory: (createTranslateLoader),
  //         deps: [HttpClient]
  //     }
  // })
  ],
  providers: [RestService, ConfirmationService, MessageService, DeviceDetectorService, DialogService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

