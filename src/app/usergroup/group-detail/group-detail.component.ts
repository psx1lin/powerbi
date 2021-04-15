import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PBIUSER } from 'src/app/Modals/pbiuser.interface';
import { ConfirmationService, Message } from 'primeng/api';

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

  constructor(private rest: RestService, private ref: DynamicDialogRef, private config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'SamAccountName', header: '員工代號' },
      { field: 'DisplayName', header: '員工姓名' },
      { field: 'NewPassword', header: '歸屬部門' },
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

  addMessages(msgs: Message[]): void {
    this.msgs = msgs;
  }
}
