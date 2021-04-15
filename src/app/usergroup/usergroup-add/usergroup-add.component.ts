import { Component, OnInit } from '@angular/core';
import { PBIGROUP } from 'src/app/Modals/pbigroup.interface';
import { RestService } from 'src/app/services/rest.service';
import { ConfirmationService, Message } from 'primeng/api';
import { ResultRec } from 'src/app/Modals/info.interface';

@Component({
  selector: 'app-usergroup-add',
  templateUrl: './usergroup-add.component.html',
  styleUrls: ['./usergroup-add.component.css']
})
export class UsergroupAddComponent implements OnInit {
  msgs: Message[] = [];
  searchStr: string = "";
  isSpanner = false;
  isSearch = false;
  isDataExist = false;
  pbigroup: PBIGROUP[] = [];
  SamAccountName = "";
  Name = "";
  Description = "";

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


  doAdd(e) {
    let obs$ = this.rest.GetAllGroup(this.SamAccountName);
    obs$.subscribe(res => {
      if (res.length !== 0) {
        const msg = `此群組已存在!:${this.searchStr} `;
        this.addMessages([{ severity: 'error', summary: '錯誤訊息', detail: msg }]);
        return;
      } else {
        const pbigroup: PBIGROUP = {
          SamAccountName: this.SamAccountName,
          Name: this.SamAccountName,
          Description: this.Description
        };
        this.isSpanner = true;
        obs$ = this.rest.AddGroup(pbigroup);
        obs$.subscribe(res => {
          const resData: ResultRec = res;
          if (resData.status === 'ok') {
            const msg = '新增成功';
            this.addMessages([{ severity: 'info', summary: '檔案訊息', detail: msg }]);
          } else {
            const msg = '新增失敗 AddGroup:' + resData.content;
            this.addMessages([{ severity: 'error', summary: '檔案訊息', detail: msg }]);
          }
          this.isSpanner = false;
        }, error => {
          this.isSpanner = false;
          const msg = '新增失敗 AddGroup:' + error.message;
          this.addMessages([{ severity: 'error', summary: '檔案訊息', detail: msg }]);
        });
      }
    }, error => {
      const msg = '失敗 GetAllGroup';
      this.addMessages([{ severity: 'error', summary: '檔案訊息', detail: msg }]);
      return;
    });


  }

  addMessages(msgs: Message[]): void {
    this.msgs = msgs;
  }

}

