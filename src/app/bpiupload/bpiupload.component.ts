import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ResultRec } from '../Modals/info.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { URLs } from '../services/url.data';
import { LoginDataService } from '../services/login-data.service';
import {Message} from 'primeng/api';
import { PBIREC } from '../Modals/pbirec.interface';
import { FileUpload } from 'primeng/fileupload';
// import { TranslateService } from '@ngx-translate/core';
// import { PrimeNGConfig } from 'primeng/api';





@Component({
  selector: 'app-bpiupload',
  templateUrl: './bpiupload.component.html',
  styleUrls: ['./bpiupload.component.css']
})
export class BpiuploadComponent implements OnInit {
  isDebug = true;
  msgs: Message[] = [];
  data: PBIREC = {};
  isUploading = false;
  user: any = {};
  uploadedFiles: any[] = [];
  onSelectedFiles: any[] = [];
  today = Date.now();
  uploadedIsPublic: boolean[] = [];
  shareContent = '分享';
  shareNotContent = '不分享';

  // 檔案上傳的webapi
  uploadUrl = URLs.Url_Upload;
  constructor(
    private rest: RestService,
    private loginDataService: LoginDataService,
    private router: Router,
    private route: ActivatedRoute,
    // private translateService: TranslateService,
    // private config: PrimeNGConfig,
  ) {}

  ngOnInit(): void {
     this.user =  this.loginDataService.localGetLoginData();
    //  this.translateService.setDefaultLang('zh');
  }

  translate(lang: string): void {
    // this.translateService.use(lang);
    // this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
}

  addMessages(msgs: Message[]): void {
        this.msgs = msgs;
    }


  onBasicUpload(event): void {
     // tslint:disable-next-line:no-unused-expression
     this.isDebug ? console.log('onBasicUpload', event) : '' ;
     this.addMessages([{severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'}]);
  }

 // uploaded 上傳結果
  onUpload(event): void {
     let msg: Message[] = [];
     // tslint:disable-next-line:no-unused-expression
     this.isDebug ?  console.log('onUpload', event) : '';
     for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
    // event.originalEvent .status .ok .statusText
     if (event.originalEvent.ok === true) {
         msg = [ { severity: 'success', summary: '上傳資訊', detail: '上傳成功' } ];
    } else {
        msg = [{ severity: 'success', summary: '上傳資訊', detail: '上傳失敗:' + event.originalEvent.statusText }];
    }
     this.addMessages(msg);
}


 // 設定 上傳前 formData  - step1
 onBeforeUpload_FormData(ev): void {
   // tslint:disable-next-line:no-unused-expression
   this.isDebug ?  console.log('onBeforeUpload_FormData') : '';
   let ispublics = '';
   this.uploadedIsPublic.forEach(e => {
    ispublics += `${e ? 'Y' : 'N'},`;
   });
   const rec: PBIREC = {
    empno: this.user.Username,
    name: this.user.Name,
    ispublic: ispublics,
    filename: ''
  };
   console.log('rec', rec);
   ev.formData.set('PBIREC', JSON.stringify(rec));
  // console.log('onBeforeUpload_FormData', ev);
}


  // 設定 header - step2
  onBeforeSend_FormData(ev): void {
     // tslint:disable-next-line:no-unused-expression
     this.isDebug ?  console.log('onBeforeSend_FormData', ev) : '';
  }

  onSelect(ev): void {
     // tslint:disable-next-line:no-unused-expression
     this.isDebug ?  console.log('onSelect', ev) : '';
    //  debugger
     this.onSelectedFiles = ev.currentFiles;
     this.onSelectedFiles.forEach((value, index)  => {
       this.uploadedIsPublic[index] = this.uploadedIsPublic[index] ?? false;
     });
     this.addMessages([]);
  }

  doUploading(): void {
    // tslint:disable-next-line:no-unused-expression
    this.isDebug ?  console.log('doUploading') : '';
    this.isUploading = true;
  }

  onError(event): void {
    // tslint:disable-next-line:no-unused-expression
    this.isDebug ? console.log('onError', event) : '';
    const response = event.error.message;
    const msg: Message[] = [
              { severity: 'success', summary: '上傳資訊', detail: '上傳失敗:onError->' + response }
            ];
    this.addMessages(msg);
    this.isUploading = false;
  }



  removeFile(file: File, uploader: FileUpload): void {
    const index = uploader.files.indexOf(file);
    uploader.remove(null, index);
  }

}
