import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { ConfirmationService, Message } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { LoginDataService } from 'src/app/services/login-data.service';
import { ItemPolicy, ODataCatalogItemsID } from 'src/app/Modals/treeNode.interface';
import { forkJoin } from 'rxjs';
import { CacheRefreshPlanValue } from 'src/app/Modals/pbiapi.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  isSpanner = false;
  user: any = {};
  data: ODataCatalogItemsID = {};
  itemPolicy: ItemPolicy = {};
  cacheRefreshPlanValue: CacheRefreshPlanValue[] = [];
  disabled: boolean = true;
pbireportcnt
  constructor(  
    private loginDataService: LoginDataService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef, private config: DynamicDialogConfig,
    private rest: RestService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.doQuery('');
  }

  doQuery(param): void {
    this.isSpanner = true;
    this.user = this.loginDataService.localGetLoginData();
    const id = this.config.data.nodeInfo.id;
    const obs$ = forkJoin([this.rest.GetCatalogItem(id), this.rest.GetItemPoliciesById(id), this.rest.GetCacheRefreshPlan(id)]);
    obs$.subscribe(([res1, res2, res3]) => {
      this.data = res1;
      this.itemPolicy = res2;
      this.cacheRefreshPlanValue = <any[]>res3;
      this.isSpanner = false;
    }, error => {
      this.isSpanner = false;
      const msg = 'GetCatalogItem,GetItemPoliciesById!!';
      this.addMessages([{ severity: 'error', summary: '錯誤訊息', detail: msg }]);
    });
  }


 

  addMessages(msgs: Message[]): void {
    // this.msgs = msgs;
    this.messageService.add({severity:msgs[0].severity, summary: msgs[0].summary, detail: msgs[0].detail});

  }

}
