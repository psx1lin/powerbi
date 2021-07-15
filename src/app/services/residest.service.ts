import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiUrl } from './api-url';
import { ResultRec } from './rec';

@Injectable({
  providedIn: 'root'
})
export class ResidestService {

  constructor(private http: HttpClient) {



   }

   getResidentInfo(h: string, id: string): Observable<ResultRec> {
     const url =  `${ApiUrl.residentInfo}?h=${h}&id=${id}`
    return  this.http.get<ResultRec>(url);
   }


}
