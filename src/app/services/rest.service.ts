import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLs } from './url.data';
import { Observable } from 'rxjs';
import { PBIREC } from './../Modals/pbirec.interface';
import { PBIUSER } from '../Modals/pbiuser.interface';
import { PBIGROUP, PBIGROUPUSERS } from '../Modals/pbigroup.interface';

@Injectable()
export class RestService {

  constructor(private http: HttpClient) { }



  GetUploadInfo(e): any {
    const url =  URLs.Url_GetUploadInfo +  e ;
    return this.http.get(url);
  }

  GetOAUser(e): any {
    const url =  URLs.Url_GetOAUser +  e ;
    return this.http.get(url);
  }

  GetAllUser(e): any {
    const url =  URLs.Url_GetAllUser +  e ;
    return this.http.get(url);
  }

  GetAllGroup(e): any {
    const url =  URLs.Url_GetAllGroup +  e ;
    return this.http.get(url);
  }

  GetGroupAllUser(e): any {
    const url =  URLs.Url_GetGroupAllUser +  e ;
    return this.http.get(url);
  }

  GetUserGroups(e): any {
    const url =  URLs.Url_GetUserGroups +  e ;
    return this.http.get(url);
  }




  GetCheckEmpnoInfo(e, p): any {
    const url =  URLs.Url_GetCheckEmpnoInfo + 'e=' + e + '&p=' + p ;
    return this.http.get(url);
  }

  GetUploadInfoForKey(e, f, i): any {
    const url =  URLs.Url_GetUploadInfoForKey + 'e=' + e + '&f=' + f + '&i=' + i ;
    return this.http.get(url);
  }

  AddUser(rec: PBIUSER): any {
    const url = URLs.Url_AddUser;
    const data = rec;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(JSON.stringify(data))
    return this.http.post(url, JSON.stringify(data), httpOptions);
  }

  AddGroup(rec: PBIGROUP): any {
    const url = URLs.Url_AddGroup;
    const data = rec;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(JSON.stringify(data))
    return this.http.post(url, JSON.stringify(data), httpOptions);
  }

  GroupAddUsers(rec: PBIGROUPUSERS): any {
    const url = URLs.Url_GroupAddUsers;
    const data = rec;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(JSON.stringify(data))
    return this.http.post(url, JSON.stringify(data), httpOptions);
  }

  GroupRemoveUsers(rec: PBIGROUPUSERS): any {
    const url = URLs.Url_GroupRemoveUsers;
    const data = rec;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(JSON.stringify(data))
    return this.http.post(url, JSON.stringify(data), httpOptions);
  }

  SyncUserOA(rec: PBIUSER): any {
    const url = URLs.Url_SyncUserOA;
    const data = rec;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(JSON.stringify(data))
    return this.http.post(url, JSON.stringify(data), httpOptions);
  }

  RemoveUser(rec: PBIUSER): any {
    const url = URLs.Url_RemoveUser;
    const data = rec;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(JSON.stringify(data))
    return this.http.post(url, JSON.stringify(data), httpOptions);
  }



  PostPbiIsPublic(rec: PBIREC[]): any {
    const url = URLs.Url_PostPbiIsPublic;
    const data = rec;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(JSON.stringify(data))
    return this.http.post(url, JSON.stringify(data), httpOptions);
  }

  DelPBIForSeqno(rec: PBIREC[]): any {
    const url = URLs.Url_DelPBIForSeqno;
    const data = rec;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(JSON.stringify(data))
    return this.http.post(url, JSON.stringify(data), httpOptions);
  }








}
