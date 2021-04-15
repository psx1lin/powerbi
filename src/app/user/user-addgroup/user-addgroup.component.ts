import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PBIUSER } from 'src/app/Modals/pbiuser.interface';
import { ConfirmationService, Message } from 'primeng/api';
import { PBIGROUP, PBIGROUPUSERS } from 'src/app/Modals/pbigroup.interface';
import { ResultRec } from 'src/app/Modals/info.interface';
import { Router } from '@angular/router';
import { LoginDataService } from 'src/app/services/login-data.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-addgroup',
  templateUrl: './user-addgroup.component.html',
  styleUrls: ['./user-addgroup.component.css']
})
export class UserAddgroupComponent implements OnInit {
  msgs: Message[] = [];
  searchStr: string = "pbi-";
  isSpanner = false;
  isSearch = true;
  user: any = {};
  cols: any[];
  pbigroups: PBIGROUP[];


  constructor(
    private router: Router,
    private loginDataService: LoginDataService,
    private rest: RestService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef, private config: DynamicDialogConfig) { }


  ngOnInit(): void {
    this.cols = [
      { field: 'SamAccountName', header: '群組代號' },
      { field: 'Name', header: '群組名稱' },
      { field: 'Description', header: '群組描述' },
      { field: '', header: '操作' },
    ];
  }

  onKeyUpEvent(event) {
    this.isSearch = true;
  }

  doQuery(param): void {
    this.isSpanner = true;
    this.user = this.loginDataService.localGetLoginData();
    const obs$ = this.rest.GetAllGroup(this.searchStr);
    obs$.subscribe(res => {
      this.pbigroups = res;
      this.isSpanner = false;
    }, error => {
      this.isSpanner = false;
      const msg = 'GetAllGroup!!';
      this.addMessages([{ severity: 'error', summary: '更新訊息', detail: msg }]);
    });
  }


  doGroupAddUsers(pbigroup) {
    this.isSpanner = true;
    const pbiGROUPUSERS: PBIGROUPUSERS = {
      pg: pbigroup,
      p: [this.config.data.pbiuser]
    };
    const obs$ = this.rest.GroupAddUsers(pbiGROUPUSERS);
    obs$.subscribe(res => {
      const resData: ResultRec = res;
      if (resData.status === 'ok') {
        const msg = '新增人員成功';
        this.addMessages([{ severity: 'info', summary: '檔案訊息', detail: msg }]);
      } else {
        const msg = '新增人員失敗 GroupAddUsers:' + resData.content;
        this.addMessages([{ severity: 'error', summary: '檔案訊息', detail: msg }]);
      }
      this.isSpanner = false;
    }, error => {
      this.isSpanner = false;
      const msg = '新增人員失敗 GroupAddUsers:' + error.message;
      this.addMessages([{ severity: 'error', summary: '檔案訊息', detail: msg }]);
    });
  }



  addMessages(msgs: Message[]): void {
    this.msgs = msgs;
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
