import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PBIREC } from '../Modals/pbirec.interface';
import { LoginDataService } from '../services/login-data.service';
import { RestService } from '../services/rest.service';
import {Message} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { ResultRec } from '../Modals/info.interface';
import { exit } from 'process';
import { DD } from '../Modals/drowdown.interface';

@Component({
  selector: 'app-uploadinfo',
  templateUrl: './uploadinfo.component.html',
  styleUrls: ['./uploadinfo.component.css']
})
export class UploadinfoComponent implements OnInit {
  pbirecs: any = [];
  selectedData: PBIREC;
  cols: any[];
  user: any = {};
  msgs: Message[] = [];
  isSpanner = false;
  display = false;
  copyInfo = '';
  shareContent = '分享';
  shareNotContent = '不分享';
  uploadedIsPublic: boolean[] = [];
  isChecked = false;
  saveHidden = false;
  qFilename = '';
  qEmpno = '';
  qIsPublic: DD[] ;
  selectedDD: DD;
  qCheck = false;


  constructor(
    private router: Router,
    private loginDataService: LoginDataService,
    private rest: RestService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.qIsPublic = [
      {name: '只查公開', code: 'N'},
      {name: '只查個人', code: 'Y'},
      {name: '全部', code: ''},
    ];
    this.cols = [
        { field: 'filename', header: '上傳檔案名' },
        { field: 'empno', header: '上傳者' },
        { field: 'name', header: '上傳姓名' },
        { field: 'ispublic', header: '分享' },
        { field: 'opdate', header: '上傳時間' },
        { field: 'op', header: '操作' },
        { field: 'seqno', header: '' },
    ];
    this.doRefresh('');
  }

  addMessages(msgs: Message[]): void {
    this.msgs = msgs;
  }

  doCopy(rowData): void {
    this.copyInfo = `${rowData.url}`;
    this.display = true;
  }


  doDeleteData(rowData): void {
      this.confirmationService.confirm({
          message: `確認刪除:${rowData.filename} ?`,
          accept: () => {
            this.isSpanner = true;
            const obs$ = this.rest.DelPBIForSeqno(rowData);
            obs$.subscribe(res => {
              const resData: ResultRec = res;
              if (resData.status === 'ok') {
                const msg = '刪除成功';
                this.addMessages([{severity: 'error', summary: '檔案訊息', detail: msg}]);
                this.doRefresh('');
              } else {
                this.isSpanner = false;
                const msg = '刪除失敗 DelPBIForSeqno:' + resData.content;
                this.msgs.push({ severity: 'error', summary: '檔案訊息', detail: msg });
              }
            }, error => {
              this.isSpanner = false;
              const msg = '刪除失敗 DelPBIForSeqno:' + error.message;
              this.msgs.push({ severity: 'error', summary: '檔案訊息', detail: msg });
            });
          }
      });
  }

  doRefresh(ev): void {
    this.isSpanner = true;
    this.user =  this.loginDataService.localGetLoginData();
    const obs$ = this.rest.GetUploadInfo(this.user.Username);
    obs$.subscribe(res => {
          this.pbirecs = res;
          this.doSetIsPublic(this.pbirecs);
          this.isSpanner = false;
          this.saveHidden = true;
    }, error => {
        this.isSpanner = false;
        const msg = '更新失敗!!';
        this.addMessages([{severity: 'error', summary: '更新訊息', detail: msg}]);
      });
  }


  doQuery(param): void {
    this.isSpanner = true;
    this.user =  this.loginDataService.localGetLoginData();
    let e = this.qEmpno;
    if (param === 'self') {
      e = this.user.Username;
    }
    const f = this.qFilename  === '' ? '' : this.qFilename;
    let i = '';
    if (this.selectedDD !== undefined ) {
       i = this.selectedDD.code;
    }
    const obs$ = this.rest.GetUploadInfoForKey(e, f, i);
    obs$.subscribe(res => {
          this.pbirecs = res;
          this.doSetIsPublic(this.pbirecs);
          this.isSpanner = false;
          this.saveHidden = true;
    }, error => {
        this.isSpanner = false;
        const msg = 'GetUploadInfoForKey失敗!!';
        this.addMessages([{severity: 'error', summary: '更新訊息', detail: msg}]);
      });
  }

  doSetIsPublic(pbirecs: PBIREC[]): void {
    this.pbirecs.forEach((val, index) => {
      this.uploadedIsPublic[index] = val.ispublic === 'Y' ? true : false;
    });
  }

  handleChange(e, rowIndex): void {
    this.isChange();
  }

  doSave(ev): void {
    this.isSpanner = true;
    const data: PBIREC[] = [];
    this.pbirecs.forEach((val, index) => {
      const ispublic = val.ispublic === 'Y' ? true : false;
      if ( ispublic !== this.uploadedIsPublic[index]) {
          data.push({
            seqno: val.seqno,
            ispublic: this.uploadedIsPublic[index] ? 'Y' : 'N'
          });
      }
    });
    if (data.length > 0) {
        const obs$ = this.rest.PostPbiIsPublic(data);
        obs$.subscribe(res => {
                const resData: ResultRec = res;
                if (resData.status === 'ok') {
                  const msg = '更新成功';
                  this.addMessages([{severity: 'error', summary: '檔案訊息', detail: msg}]);
                  this.doRefresh('');
                } else {
                  this.isSpanner = false;
                  const msg = '更新失敗 PostPbiIsPublic:' + resData.content;
                  this.msgs.push({ severity: 'error', summary: '檔案訊息', detail: msg });
                }
              }, error => {
                this.isSpanner = false;
                const msg = '更新失敗 PostPbiIsPublic:' + error.message;
                this.msgs.push({ severity: 'error', summary: '檔案訊息', detail: msg });
        });
    }
  }

  isChange(): void {
    this.saveHidden = true;
    this.pbirecs.forEach((val, index) => {
        const ispublic = val.ispublic === 'Y' ? true : false;
        if ( ispublic !== this.uploadedIsPublic[index]) {
            this.saveHidden = false;
            return;
        }
    });
  }

}
