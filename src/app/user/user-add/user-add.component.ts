import { Component, OnInit } from '@angular/core';
import { PBIUSER } from 'src/app/Modals/pbiuser.interface';
import { RestService } from 'src/app/services/rest.service';
import { ConfirmationService, Message } from 'primeng/api';
import { ResultRec } from 'src/app/Modals/info.interface';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  msgs: Message[] = [];
  searchStr: string;
  isSpanner = false;
  isSearch = false;
  isDataExist = false;
  pbiuser: PBIUSER; 
  SamAccountName = "";
  DisplayName = "";
  NewPassword = "";

  constructor(
    private rest: RestService,
  ) { }

  ngOnInit(): void {
    this.isDataExist = false;
    this.isSearch = false;

  }


  onKeyUpEvent(event) {
    this.isSearch = true;
    this.isDataExist = false;
  }

  doQuery(param): void {
    this.isSpanner = true;
    const obs$ = this.rest.GetOAUser(this.searchStr);
    obs$.subscribe(res => {
          if (res == null){
            this.isDataExist = false;
            const msg = `無此員工代號!!:${this.searchStr}`;
            this.addMessages([{severity: 'error', summary: '錯誤訊息', detail: msg}]);
          } else {
            this.pbiuser = res;
            if (this.pbiuser.Enabled){
              this.isDataExist = false;
              const msg = `此員工代號已存在!:${this.searchStr} `;
              this.addMessages([{severity: 'error', summary: '錯誤訊息', detail: msg}]);
            } else {
              this.SamAccountName = this.pbiuser.SamAccountName;
              this.DisplayName = this.pbiuser.DisplayName;
              this.NewPassword = this.pbiuser.NewPassword;
              this.isDataExist = true;
            }
          }     
          this.isSpanner = false;
    }, error => {
        this.isSpanner = false;
        const msg = 'GetOAUser error!!';
        this.addMessages([{severity: 'error', summary: '錯誤訊息', detail: msg}]);
      });
  }

  doAdd(e){
    const pbiuser: PBIUSER = {
      SamAccountName : this.SamAccountName
    };
    this.isSpanner = true;
    const obs$ = this.rest.AddUser(pbiuser);
    obs$.subscribe(res => {
            const resData: ResultRec = res;
            if (resData.status === 'ok') {
              const msg = '新增成功';
              this.addMessages([{severity: 'info', summary: '檔案訊息', detail: msg}]);
            } else {
              const msg = '新增失敗 AddUser:' + resData.content;
              this.addMessages([{severity: 'error', summary: '檔案訊息', detail: msg}]);
            }
            this.isSpanner = false;
          }, error => {
            this.isSpanner = false;
            const msg = '新增失敗 AddUser:' + error.message;
            this.addMessages([{severity: 'error', summary: '檔案訊息', detail: msg}]);
    });
  }

  addMessages(msgs: Message[]): void {
    this.msgs = msgs;
  }

}
