import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PBIUSER } from 'src/app/Modals/pbiuser.interface';
import { ConfirmationService, Message } from 'primeng/api';
import { PBIGROUPUSERS } from 'src/app/Modals/pbigroup.interface';
import { ResultRec } from 'src/app/Modals/info.interface';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit {
  msgs: Message[] = [];
  isSpanner = false;
  pbigroups: any[] = [];
  user: any = {};
  cols: any[];

  constructor(private rest: RestService, private ref: DynamicDialogRef, private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'SamAccountName', header: '群組代號' },
      { field: 'Name', header: '群組名稱' },
      { field: 'Description', header: '群組描述' },
      { field: '', header: '操作' },
    ];
    this.getData(this.config.data.pbiuser);
  }

  getData(pbiuser) {
    const empno = pbiuser.SamAccountName;
    const obs$ = this.rest.GetUserGroups(empno);
    obs$.subscribe(res => {
      this.pbigroups = res;
      this.isSpanner = false;
    }, error => {
      this.isSpanner = false;
      const msg = 'GetUserGroups!!';
      this.addMessages([{ severity: 'error', summary: '訊息', detail: msg }]);
    });
  }

  doQuery(e) {
    this.getData(this.config.data.pbigroup);
  }

  doGroupRemoveUser(pbigroup) {
    this.isSpanner = true;
    const pbiGROUPUSERS: PBIGROUPUSERS = {
        pg: pbigroup,
        p: [this.config.data.pbiuser]
    };
    const obs$ = this.rest.GroupRemoveUsers(pbiGROUPUSERS);
    obs$.subscribe(res => {
            const resData: ResultRec = res;
            if (resData.status === 'ok') {
              this.getData(this.config.data.pbigroup);
              const msg = '刪除成功';
              this.addMessages([{severity: 'info', summary: '檔案訊息', detail: msg}]);
            } else {
              const msg = '刪除失敗 GroupRemoveUsers:' + resData.content;
              this.addMessages([{severity: 'error', summary: '檔案訊息', detail: msg}]);
            }
            this.isSpanner = false;
          }, error => {
            this.isSpanner = false;
            const msg = '刪除失敗 GroupRemoveUsers:' + error.message;
            this.addMessages([{severity: 'error', summary: '檔案訊息', detail: msg}]);
    });

  }


  addMessages(msgs: Message[]): void {
    this.msgs = msgs;
  }
}
