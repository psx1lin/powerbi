import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ResultRec } from '../Modals/info.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { URLs } from '../services/url.data';
import { LoginDataService } from '../services/login-data.service';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PBIUSER } from '../Modals/pbiuser.interface';
import { UserAddComponent } from './user-add/user-add.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UserAddgroupComponent } from './user-addgroup/user-addgroup.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  msgs: Message[] = [];
  searchStr: string;
  isSpanner = false;
  isSearch = false;
  user: any = {};
  cols: any[];
  pbiusers: PBIUSER[];
  constructor(
    private router: Router,
    private loginDataService: LoginDataService,
    private rest: RestService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService) { }

  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.cols = [
      { field: 'SamAccountName', header: '員工代號' },
      { field: 'DisplayName', header: '員工姓名' },
      { field: 'NewPassword', header: '歸屬部門' },
      { field: '', header: '操作' },
    ];
  }

  onKeyUpEvent(event) {
    this.isSearch = true;
  }

  doQuery(param): void {
    this.isSpanner = true;
    this.user = this.loginDataService.localGetLoginData();
    const obs$ = this.rest.GetAllUser(this.searchStr.toUpperCase());
    obs$.subscribe(res => {
      this.pbiusers = res;
      this.isSpanner = false;
    }, error => {
      this.isSpanner = false;
      const msg = 'GetAllUser!!';
      this.addMessages([{ severity: 'error', summary: '更新訊息', detail: msg }]);
    });
  }

  doAdd(e) {
    this.ref = this.dialogService.open(UserAddComponent, {
      header: '新增員工',
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((pbiuser: PBIUSER) => {
      if (pbiuser) {
        const msg = pbiuser.Name;
        this.addMessages([{ severity: 'error', summary: '更新訊息', detail: msg }]);
      }
    });
  }

  doUserGroups(pbiuser) {
    this.ref = this.dialogService.open(UserGroupsComponent, {
      data: {
        pbiuser
      },
      header: `${pbiuser.SamAccountName + pbiuser.DisplayName} 所屬群組`,
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((pbiuser: PBIUSER) => {
      if (pbiuser) {
        const msg = pbiuser.Name;
        this.addMessages([{ severity: 'error', summary: '更新訊息', detail: msg }]);
      }
    });
  }

  doSyncOA(pbiuser: PBIUSER) {
    this.confirmationService.confirm({
      message: `同步OA人員:${pbiuser.SamAccountName + pbiuser.DisplayName}?`,
      header: `同步OA`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.syncOA(pbiuser);
      }
    });
  }

  syncOA(pbiuser: PBIUSER) {
    this.isSpanner = true;
    const obs$ = this.rest.SyncUserOA(pbiuser);
    obs$.subscribe(res => {
            const resData: ResultRec = res;
            if (resData.status === 'ok') {
              const msg = '同步成功';
              this.addMessages([{severity: 'info', summary: '檔案訊息', detail: msg}]);
            } else {
              const msg = '同步失敗 SyncUserOA:' + resData.content;
              this.addMessages([{severity: 'error', summary: '檔案訊息', detail: msg}]);
            }
            this.isSpanner = false;
          }, error => {
            this.isSpanner = false;
            const msg = '同步失敗 SyncUserOA:' + error.message;
            this.addMessages([{severity: 'error', summary: '檔案訊息', detail: msg}]);
    });
  }

  doRemoveUser(pbiuser) {
    this.confirmationService.confirm({
      message: `刪除人員:${pbiuser.SamAccountName + pbiuser.DisplayName}?`,
      header: `刪除人員`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeADUser(pbiuser);
      }
    });
  }

  removeADUser(pbiuser: PBIUSER) {
    this.isSpanner = true;
    const obs$ = this.rest.RemoveUser(pbiuser);
    obs$.subscribe(res => {
            const resData: ResultRec = res;
            if (resData.status === 'ok') {
              const msg = '刪除成功';
              this.addMessages([{severity: 'info', summary: '檔案訊息', detail: msg}]);
            } else {
              const msg = '刪除失敗 RemoveUser:' + resData.content;
              this.addMessages([{severity: 'error', summary: '檔案訊息', detail: msg}]);
            }
            this.isSpanner = false;
          }, error => {
            this.isSpanner = false;
            const msg = '刪除失敗 RemoveUser:' + error.message;
            this.addMessages([{severity: 'error', summary: '檔案訊息', detail: msg}]);
    });
  }

  doGroupAddUsers(pbiuser) {
    this.ref = this.dialogService.open(UserAddgroupComponent, {
      data: {
        pbiuser
      },
      header: `${pbiuser.SamAccountName + pbiuser.DisplayName} 加入群組`,
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((pbiuser: PBIUSER) => {
      if (pbiuser) {
        const msg = pbiuser.Name;
        this.addMessages([{ severity: 'error', summary: '更新訊息', detail: msg }]);
      }
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
