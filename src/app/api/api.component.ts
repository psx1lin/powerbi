import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { LoginDataService } from '../services/login-data.service';
import { RestService } from '../services/rest.service';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InfoComponent } from './info/info.component';
import { ODataCatalogItemsID } from '../Modals/treeNode.interface';
import { PolicyComponent } from './policy/policy.component';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  msgs: Message[] = [];
  isSpanner = false;
  user: any = {};
  cols: any[];
  files1: TreeNode[] = [];
  filesTreeData: TreeNode[] = [];
  totfoldercnt = 0;
  totpbireportcnt = 0;
  statuses: any[];
  nodex: any;
  treeExpanSwitch = true;
  constructor(
    private rest: RestService,
    private loginDataService: LoginDataService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,) { }

  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: '指標名稱' ,css:'cust-table-name'},
      { field: 'type', header: '類型' ,css:'cust-table-type'},
      { field: 'path', header: '路徑' ,css:''},
      { field: 'createdby', header: '產生者' ,css:'cust-table-x' },
      { field: 'modifiedby', header: '維護者' ,css:'cust-table-x'},
      { field: 'id', header: '' ,css:'cust-table-id'},
    ];
    this.statuses = [
      { label: "資料匣", value: "資料匣" },
      { label: "Bi報表", value: "Bi報表" },
    ];
    this.doQuery('');
  }

  doQuery(param): void {
    this.isSpanner = true;
    this.user = this.loginDataService.localGetLoginData();
    const obs$ = forkJoin([this.rest.GetTreeNode("1061"), this.rest.GetTreeData("1061")]);
    // const obs$ = this.rest.GetTreeNode("1061");
    obs$.subscribe(([res, res1]) => {
      this.files1 = <TreeNode[]>res;
      this.filesTreeData = <any[]>res1;
      if (this.files1.length > 0) {
        this.totfoldercnt = this.files1[0].data.totfoldercnt;
        this.totpbireportcnt = this.files1[0].data.totpbireportcnt;
      }
      this.setTotcnt("1",this.files1);
      this.setTotcnt("2",this.filesTreeData);
      this.treeDataSwitch(this.files1, true);
      this.treeDataSwitch(this.filesTreeData, true);
      this.isSpanner = false;
    }, error => {
      this.isSpanner = false;
      const msg = 'GetTreeNode!!';
      this.addMessages([{ severity: "error", summary: '讀取訊息', detail: msg }]);
    });
  }

  doPolicy(data): void {
    this.ref = this.dialogService.open(PolicyComponent, {
      data: {
        nodeInfo: data
      },
      header: '權限明細',
      width: '70%',
      contentStyle: { "max-height": "650px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((oDataCatalogItemsID: ODataCatalogItemsID) => {
      if (oDataCatalogItemsID) {
        const msg = oDataCatalogItemsID.Name;
        this.addMessages([{ severity: "error", summary: '讀取訊息', detail: msg }]);
      }
    });
  }


  doAdd(data) {
    this.ref = this.dialogService.open(InfoComponent, {
      data: {
        nodeInfo: data
      },
      header: '明細',
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((oDataCatalogItemsID: ODataCatalogItemsID) => {
      if (oDataCatalogItemsID) {
        const msg = oDataCatalogItemsID.Name;
        this.addMessages([{ severity: "error", summary: '讀取訊息', detail: msg }]);
      }
    });
  }

  doTreeExpanSwitchChange(type, data) {
    switch (type) {
      case 1: {
        this.treeDataSwitch(this.files1, data.checked);
        break;
      }
      case 2: {
        this.treeDataSwitch(this.filesTreeData, data.checked);
        break;
      }
      default: {
        break;
      }
    }
  }

  treeDataSwitch(obj, checked: boolean) {
    obj.forEach(node => {
      this.expandRecursive(node, checked);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }


  setTotcnt(type,obj) {  
    obj.forEach(p => this.totcntRecursive(type,p));
  }

  totcntRecursive(type,obj) {  
    if (type === "1") {
      obj.data.totchildrencnt = obj.children.length;
    } else {
      obj.totchildrencnt = obj.children.length;
    }
    if (obj.children) {
      obj.children.forEach(childNode => this.totcntRecursive(type, childNode));
    }    
  }

  addMessages(msgs: Message[]): void {
    this.msgs = msgs;
  }

}
