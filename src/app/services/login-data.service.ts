import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLs } from './url.data';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {


  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  localSetLoginData(val) {
    localStorage.setItem('loginData', JSON.stringify(val));
  }



  localGetLoginData(): any {
    return JSON.parse(localStorage.getItem('loginData'));
  }

  // tslint:disable-next-line:typedef
  localSetR(val) {
    localStorage.setItem('secu', JSON.stringify(val));
  }


  localGetR(): any {
    return JSON.parse(localStorage.getItem('secu'));
  }

  // tslint:disable-next-line:typedef
  GetRoles(empno) {
    const url = URLs.Url_GetRoles + empno;
    return this.http.get(url);
  }


  localGetTest(): any {
    return localStorage.getItem('test');
  }

  // tslint:disable-next-line:typedef
  removeLoginData() {
    localStorage.removeItem('loginData');
  }

/**
 * 清除所有 localStorage
 */
  // tslint:disable-next-line:typedef
  clearALLStorage() {
    localStorage.clear();
  }


}
