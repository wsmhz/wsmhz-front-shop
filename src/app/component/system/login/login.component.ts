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

  codeImgSrc = "system/code/image";
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
      this.codeImgSrc = "system/code/image";
    },1);
  }


  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.imageCode)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            if (typeof localStorage === 'object') {  //测试该设备环境是否支持缓存
              try {
                let curTime = new Date().getTime();
                localStorage.setItem("user",JSON.stringify({user:res.data,time:curTime}));
                this.router.navigate(['/home'],{queryParams:{loginFlag:true}});
              } catch (e) {
                alert('您处于无痕浏览，无法为您保存信息，请关闭无痕模式后重新登陆');
              }
            }
          }
        }).catch(error=>{
            this.changeCode();
      });
    }
  }
}
