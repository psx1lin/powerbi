import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLs } from './url.data';

@Injectable({
  providedIn: 'root'
})
export class OaService {
  constructor(private http: HttpClient) {}
  
}
