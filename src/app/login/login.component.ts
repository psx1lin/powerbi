import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResidestService } from '../services/residest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private residestService: ResidestService,private router: Router) { }

  loginForm: FormGroup = this.fb.group({
    userName: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      this.userNameCheck
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      this.passwordCheck
    ]],
  });

  userNameCheck(userName: FormControl): Object {
    const value = userName.value || ''
    if (value===''){
      return {}
    }
    const ok = value.match(/[A-Z][0-9]{9}/)
    if (!ok) {
        return {msg: '身份証號有誤'}
    }
    return {};

  }

  passwordCheck(password: FormControl): object {
    const value = password.value || ''
    if (value===''){
      return {}
    }
    if (value.length  !== 6){
      return {msg:'密碼錯誤'};
    }
    return {};
  }

  getUserName() {
    const username = this.loginForm.get('userName')?.value;
    return username;
  }

  submit()  {
    const hosp = '1';
    const username = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;
     if (username.substr(-6,6) !== password){
         alert('密碼錯誤')
         return
     }
    const $obj = this.residestService.getResidentInfo(hosp,username)
    $obj.subscribe(x => {
          if (x.status !== 'ok') {
            alert(`${x.content}`)
          }else{
              this.router.navigate(['url'],{ queryParams: {hosp,username, password} })
          }
        },error => alert(error)
    );
  }


  ngOnInit(): void {
  }

}
