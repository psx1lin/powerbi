import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiUrl } from '../services/api-url';

@Component({
  selector: 'app-gotourl',
  templateUrl: './gotourl.component.html',
  styleUrls: ['./gotourl.component.css']
})
export class GotourlComponent implements OnInit {

  constructor(private routerInfo:ActivatedRoute) { }

  ngOnInit(): void {
    const p = this.routerInfo.snapshot.queryParams
    const hosp = p.hosp
    const username = p.username
    const password = p.password
    window.location.href = `${ApiUrl.order_diet}?HospID=${hosp}&empno=${username}`;
  }

}
