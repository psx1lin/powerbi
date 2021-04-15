import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PBIUSER } from 'src/app/Modals/pbiuser.interface';
import { ConfirmationService, Message } from 'primeng/api';
import { PBIGROUPUSERS } from 'src/app/Modals/pbigroup.interface';
import { ResultRec } from 'src/app/Modals/info.interface';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  msgs: Message[] = [];
  isSpanner = false;
  pbiusers: any[] = [];
  user: any = {};
  cols: any[];
  display: boolean = false;
  searchStr = "";
 

  constructor(private rest: RestService, private ref: DynamicDialogRef, private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'SamAccountName', header: '員工代號' },
      { field: 'DisplayName', header: '員工姓名' },
      { field: 'NewPassword', header: '歸屬部門' },
      { field: '', header: '操作' },
    ];
    this.getData(this.config.data.pbigroup);
  }

  getData(pbigroup) {
    const obs$ = this.rest.GetGroupAllUser(pbigroup.Name);
    obs$.subscribe(res => {
      this.pbiusers = res;
      this.isSpanner = false;
    }, error => {
      this.isSpanner = false;
      const msg = 'GetGroupAllUser!!';
      this.addMessages([{ severity: 'error', summary: '更新訊息', detail: msg }]);
    });
  }

  doQuery(e) {
    this.getData(this.config.data.pbigroup);
  }


  doGroupAddUsers() {
    this.display = true;
  }

  doGroupRemoveUser(pbiuser) {
    this.isSpanner = true;
    const pbiGROUPUSERS: PBIGROUPUSERS = {
        pg: this.config.data.pbigroup,
        p: [pbiuser]
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
