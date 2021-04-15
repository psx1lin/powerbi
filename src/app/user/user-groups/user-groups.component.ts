import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PBIUSER } from 'src/app/Modals/pbiuser.interface';
import { ConfirmationService, Message } from 'primeng/api';

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

  addMessages(msgs: Message[]): void {
    this.msgs = msgs;
  }
}
