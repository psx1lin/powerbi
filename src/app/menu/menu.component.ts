import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RestService } from '../services/rest.service';
import { ResultRec } from '../Modals/info.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginDataService } from '../services/login-data.service';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  user: any = {};
  secu: any = {};
  myDate: Date;
  constructor(
    private rest: RestService,
    private loginDataService: LoginDataService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.user = this.loginDataService.localGetLoginData();
    this.secu = this.loginDataService.localGetR();
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
    this.items = [
      {
        label: '檔案',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: '上傳excel檔',
            icon: 'pi pi-fw pi-upload',
            routerLink: '/pbiupload'
          },
          {
            label: '登出',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
              this.doQuit();
            }
          }
        ]
      },
      {
        label: '查詢',
        icon: 'pi pi-fw pi-search',
        items: [
          {
            label: '上傳資訊',
            icon: 'pi pi-fw pi-info',
            routerLink: '/uploadinfo'
          },
        ]
      }
    ];
    if (this.secu.secu > 1) {
      this.items.push({
        label: '角色',
        icon: 'pi pi-fw pi-user-edit',
        items: [
          {
            label: '使用者維護',
            icon: 'pi pi-fw pi-user',
            routerLink: '/user'
          },
          {
            label: '群組維護',
            icon: 'pi pi-fw pi-users',
            routerLink: '/usergroup'
          },
          {
            label: '整批設定',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: '/setusergroup'
          }
        ]
      });
    }
    if (this.secu.secu > 1) {
      this.items.push({
        label: '指標',
        icon: 'pi pi-fw pi-user-edit',
        items: [
          {
            label: '指標列表',
            icon: 'pi pi-fw pi-user',
            routerLink: '/api'
          },          
        ]
      });
    }
  }

  doQuit(): void {
    this.confirmationService.confirm({
      message: `確認登出 ?`,
      accept: () => {
        this.router.navigate(['/login']);
      }
    });
  }

}
