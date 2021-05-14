import { Component, OnInit } from '@angular/core';
import { LoginDataService } from 'src/app/services/login-data.service';
import { RestService } from 'src/app/services/rest.service';
import { ConfirmationService, Message } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { ItemPolicy, ODataCatalogItemsID } from 'src/app/Modals/treeNode.interface';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  msgs: Message[] = [];
  isSpanner = false;
  user: any = {};
  data: ODataCatalogItemsID = {};
  itemPolicy: ItemPolicy = {};
  disabled: boolean = true;
  cols: any[];
  constructor(
    private loginDataService: LoginDataService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef, private config: DynamicDialogConfig,
    private rest: RestService,
    private messageService: MessageService) { }

    ngOnInit(): void {
      this.cols = [
        { field: 'GroupUserName', header: '成員', css:'cust-table-GroupUserName'},
        { field: 'Roles', header: '權限' ,css:'cust-table-Roles'},
        { field: '', header: '操作' ,css:'cust-table-op'},
      ];
      this.doQuery('');
    }
  
    doQuery(param): void {
      this.isSpanner = true;
      this.user = this.loginDataService.localGetLoginData();
      const id = this.config.data.nodeInfo.id;
      const obs$ = this.rest.GetItemPoliciesById(id);
      obs$.subscribe(res => {
        this.itemPolicy = res;
        this.isSpanner = false;
      }, error => {
        this.isSpanner = false;
        const msg = 'GetItemPoliciesById!!';
        this.addMessages([{ severity: 'error', summary: '錯誤訊息', detail: msg }]);
      });
    }
  
    doRole(data) {

    }
    
    addMessages(msgs: Message[]): void {
      // this.msgs = msgs;
      this.messageService.add({severity:msgs[0].severity, summary: msgs[0].summary, detail: msgs[0].detail});
  
    }

}
