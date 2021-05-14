import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ResultRec } from '../Modals/info.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { URLs } from '../services/url.data';
import { LoginDataService } from '../services/login-data.service';
import { ConfirmationService, Message } from 'primeng/api';
import { PBIGROUP, PBIGROUPUSERS } from '../Modals/pbigroup.interface';
import { forkJoin } from 'rxjs';
import { PBIUSER } from '../Modals/pbiuser.interface';

@Component({
  selector: 'app-setusergroup',
  templateUrl: './setusergroup.component.html',
  styleUrls: ['./setusergroup.component.css']
})
export class SetusergroupComponent implements OnInit {
  msgs: Message[] = [];
  isSpanner = false;
  groups: PBIGROUP[] = [];
  selectedGroup: PBIGROUP = {};
  selectedGroup1: PBIGROUP = {};
  list1: any[] = [];
  list2: any[] = [];
  list3: any[] = [];
  list4: any[] = [];

  constructor(private router: Router,
    private loginDataService: LoginDataService,
    private rest: RestService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    const obs$ = forkJoin([this.rest.GetAllGroup(""), this.rest.GetAllUser("")]);
    // const obs$ = this.rest.GetAllGroup("");
    obs$.subscribe(([res1, res2]) => {
      this.groups = <any[]>res1;
      this.list1 = <any[]>res2;
      this.isSpanner = false;
    }, error => {
      this.isSpanner = false;
      const msg = 'GetAllGroup!!';
      this.addMessages([{ severity: 'error', summary: '錯誤訊息', detail: msg }]);
    });
  }

  confirm() {
    if (this.selectedGroup.Name === undefined) {
      const msg = "請選擇群組!!";
      this.addMessages([{ severity: 'error', summary: '錯誤訊息', detail: msg }]);
      return;
    }
    let s = "";
    let cnt = 0;
    s = this.list2.length > 0 ? `${this.list2[0].Name}..共${this.list2.length}人` : "";
    if (s===""){
      this.addMessages([{ severity: 'error', summary: '讀取訊息', detail: "無選定人員" }]);
      return ;
    }
    this.confirmationService.confirm({
      message: `新增人員${s}?`,
      header: `群組:${this.selectedGroup.Name}(${this.selectedGroup.Description})`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doAdd("");
      }
    });
  }

  confirm1() {
    if (this.selectedGroup1.Name === undefined) {
      const msg = "請選擇群組!!";
      this.addMessages([{ severity: 'error', summary: '錯誤訊息', detail: msg }]);
      return;
    }
    let s = "";
    s = this.list4.length > 0 ? `${this.list4[0].Name}..共${this.list4.length}人` : "";
    if (s===""){
      this.addMessages([{ severity: 'error', summary: '讀取訊息', detail: "無選定人員" }]);
      return ;
    }
    this.confirmationService.confirm({
      message: `移除人員${s}?`,
      header: `群組:${this.selectedGroup1.Name}(${this.selectedGroup1.Description})`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRemove("");
      }
    });
  }

  doSelectedUsers() {
    this.isSpanner = true;
    const obs$ = this.rest.GetGroupAllUser(this.selectedGroup.Name);
    obs$.subscribe(res => {
      this.list2 = res;
      this.removeList1FromList2();
      this.isSpanner = false;
    }, error => {
      this.isSpanner = false;
      const msg = 'GetGroupAllUser!!';
      this.addMessages([{ severity: 'error', summary: '讀取訊息', detail: msg }]);
    });
  }

  removeList1FromList2() {
    this.list2.forEach(x2 => {
      const index = this.list1.findIndex(x1 => x1.SamAccountName === x2.SamAccountName);
      if (index !== -1) {
        this.list1.splice(index, 1);
      }
    })
  }

  doAdd(e) {
    if (this.selectedGroup !== undefined) {
      const _pbi: PBIGROUPUSERS = {
        pg: this.selectedGroup,
        p: this.list2
      };
      this.isSpanner = true;
      const obs$ = this.rest.GroupAddUsers(_pbi);
      obs$.subscribe(res => {
        const resData: ResultRec = res;
        if (resData.status === 'ok') {
          const msg = '新增成功';
          this.addMessages([{ severity: 'info', summary: '檔案訊息', detail: msg }]);
        } else {
          const msg = '新增失敗 GroupAddUsers:' + resData.content;
          this.addMessages([{ severity: 'error', summary: '檔案訊息', detail: msg }]);
        }
        this.isSpanner = false;
      }, error => {
        this.isSpanner = false;
        const msg = '新增失敗 GroupAddUsers:' + error.message;
        this.addMessages([{ severity: 'error', summary: '檔案訊息', detail: msg }]);
      });
    }
  }

  doRemove(e) {
    if (this.selectedGroup1 !== undefined) {
      const _pbi: PBIGROUPUSERS = {
        pg: this.selectedGroup1,
        p: this.list4
      };
      this.isSpanner = true;
      const obs$ = this.rest.GroupRemoveUsers(_pbi);
      obs$.subscribe(res => {
        const resData: ResultRec = res;
        if (resData.status === 'ok') {
          const msg = '移除成功';
          this.addMessages([{ severity: 'info', summary: '檔案訊息', detail: msg }]);
        } else {
          const msg = '移除失敗 GroupRemoveUsers:' + resData.content;
          this.addMessages([{ severity: 'error', summary: '檔案訊息', detail: msg }]);
        }
        this.isSpanner = false;
      }, error => {
        this.isSpanner = false;
        const msg = '移除失敗 GroupRemoveUsers:' + error.message;
        this.addMessages([{ severity: 'error', summary: '檔案訊息', detail: msg }]);
      });
    }
  }


  doChange() {
    this.isSpanner = true;
    const obs$ = this.rest.GetGroupAllUser(this.selectedGroup1.Name);
    obs$.subscribe(res => {
      this.list3 = res;
      this.isSpanner = false;
    }, error => {
      this.isSpanner = false;
      const msg = '讀取失敗 GetAllGroup:' + error.message;
      this.addMessages([{ severity: 'error', summary: '檔案訊息', detail: msg }]);
    });
  }

  addMessages(msgs: Message[]): void {
    this.msgs = msgs;
  }
}
