import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  ValidationErrors,
  FormGroup,
  Validators
} from '@angular/forms';

import { DeviceDetectorService } from 'ngx-device-detector';

import { RestService } from '../services/rest.service';
import { LoginDataService } from './../services/login-data.service';
import { ResultRec } from '../Modals/info.interface';


import {Message} from 'primeng/api';
import { Router } from '@angular/router';
import { IloginData, IMMHRole } from '../Modals/login.interface';

declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  deviceInfo = null;
  browserOK = true;
  startRoute = 'menu';
  objName = '';
  msgs: Message[] = [];
  userform: FormGroup;
  loginData: IloginData;
  roles: IMMHRole[] = [];
  progressBarvalue = 0;
  @Output()  user = new EventEmitter<any>();

// ng build --prod --base-href=/powerbi

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginDataService: LoginDataService,
    private rest: RestService,
    private deviceService: DeviceDetectorService
  ) {
    this.objName = 'login';
    this.epicFunction();
  }


  epicFunction(): void {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if (this.deviceInfo.browser === 'IE') {
      const msg = '使用瀏覽器軟體 Google Chrome、Firefox，並搭配 1024 x 768 以上之螢幕解析度，以獲得最佳瀏覽體驗。!!';
      this.msgs.push({ severity: 'error', summary: '登入訊息', detail: msg });
      this.browserOK = false;
    }
  }

  ngOnInit(): void {
    $('.ui-menubar').hide();
    this.loginDataService.clearALLStorage();
    this.userform = this.fb.group({
      Username: ['', [Validators.required, Validators.minLength(4)]],
      Password: ['', [Validators.required]]
    });
    $('.ui-panel-titlebar').css('background-color', 'yellow');

  }

  addMessages(msgs: Message[]): void {
    this.msgs = msgs;
}


  hasFormErrors(): boolean {
    // return !this.loginForm.valid || !this.reCAPTCHA;
    if (this.browserOK) {
      return !this.userform.valid;
    }
    return true;
  }

  onSubmit(value): void {
    // console.log('onSubmit', JSON.stringify(this.userform.value), 'value', value);

    this.msgs = [];
    this.progressBarvalue = this.progressBarvalue + Math.floor(Math.random() * 10) + 1;
    const password = this.userform.value.Password;
    // console.log('onSubmit logindata', loginData);
    const obs$ = this.rest.GetCheckEmpnoInfo(value.Username, value.Password);
    obs$.subscribe(res => {
      let resData: ResultRec = res;
      if (resData.status === 'ok') {
        this.loginData = JSON.parse(resData.content);
        this.loginDataService.localSetLoginData(this.loginData);
        this.loginDataService.GetRoles(this.loginData.Username)
          .subscribe(res2 => {
            resData = res2;
            if (resData.status === 'ok') {
              this.roles = JSON.parse(resData.content);
              const indexRole = this.roles.findIndex(x => x.apname === 'MMH95_PBIUPLOAD' && Number(x.secu) > 0);
              if ( indexRole !== -1) {
                this.loginDataService.localSetR(this.roles[indexRole]);
                // console.log('user emit');
                this.user.emit({
                  empno: this.loginData.Username,
                  name: this.loginData.Name
                });
                $('.ui-menubar').show();
                this.router.navigate(['/pbiupload']);
              } else {
                const msg = '無使用權限!!';
                this.addMessages([{severity: 'error', summary: '登入訊息', detail: msg}]);
              }
            } else {
              const msg = '無使用權限!!';
              this.addMessages([{severity: 'error', summary: '登入訊息', detail: msg}]);

            }
          }, error => {
            const msg = '無使用權限!!';
            this.addMessages([{severity: 'error', summary: '登入訊息', detail: msg}]);
          });
      } else {
        const msg = '無此代號!!';
        this.addMessages([{severity: 'error', summary: '登入訊息', detail: msg}]);
      }
    }, error => {
      console.log(error);
      const msg = '登入失敗:' + error.message;
      this.addMessages([{severity: 'error', summary: '登入訊息', detail: msg}]);
    });


  }

  do(ev): void {
    ev.preventDefault();
    const el: HTMLElement = document.getElementById('idSubmit') as HTMLElement;
    el.click();
  }

} // end
