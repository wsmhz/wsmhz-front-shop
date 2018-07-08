import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {LoginService, User} from "../../../service/login/login.service";
import {CommonConfig} from "../../../config/commonConfig";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[
    LoginService
  ]
})
export class LoginComponent implements OnInit {

  codeImgSrc = "/code/image";
  user = new User();
  loginForm:FormGroup;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private commonConfig:CommonConfig
  ) { }

  ngOnInit() {
    this.loginForm = new FormBuilder().group({
      username: ["", [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      imageCode: ['', Validators.required]
    });
  }

  changeCode(){
    this.codeImgSrc = "";
    setTimeout(()=>{
      this.codeImgSrc = "/code/image";
    },1);
  }


  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.imageCode)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            let curTime = new Date().getTime();
            window.localStorage.setItem("user",JSON.stringify({user:res.data,time:curTime}));
            this.router.navigate(['/home'],{queryParams:{loginFlag:true}});
          }
        }).catch(error=>{
            this.changeCode();
      });
    }
  }
}
