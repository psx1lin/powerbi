import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ResultRec } from '../Modals/info.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { URLs } from '../services/url.data';
import { LoginDataService } from '../services/login-data.service';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsergroupAddComponent } from './usergroup-add/usergroup-add.component';
import { PBIGROUP } from '../Modals/pbigroup.interface';
import { GroupDetailComponent } from './group-detail/group-detail.component';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit {
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
    private dialogService: DialogService) { }

  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.cols = [
      { field: 'SamAccountName', header: '群組代號' },
      { field: 'Name', header: '群組名稱' },
      { field: 'Description', header: '群組描述' },
      { field: '', header: '詳細' },
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

  doAdd(e) {
    this.ref = this.dialogService.open(UsergroupAddComponent, {
      header: '新增群組',
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((pbigroup: PBIGROUP) => {
      if (pbigroup) {
        const msg = pbigroup.Name;
        this.addMessages([{ severity: 'error', summary: '更新訊息', detail: msg }]);
      }
    });
  }

  doDetailGroupUsers(pbigroup) {
    this.ref = this.dialogService.open(GroupDetailComponent, {
      data: {
        pbigroup: pbigroup
      },
      header: `${pbigroup.SamAccountName + pbigroup.Name} 群組明細`,
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((pbigroup: PBIGROUP) => {
      if (pbigroup) {
        const msg = pbigroup.Name;
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
