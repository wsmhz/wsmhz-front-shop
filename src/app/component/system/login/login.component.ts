import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {LoginService, User} from "../../../service/login/login.service";
import {UserService} from "../../../service/user/user.service";
import {CommonConfig} from "../../../config/commonConfig";
import {Router} from "@angular/router";

declare var layer:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[
    LoginService,
    UserService
  ]
})
export class LoginComponent implements OnInit {

  codeImgSrc = "oauth-service/system/code/image?deviceId=wsmhz";
  user = new User();
  loginForm:FormGroup;
  constructor(
    private loginService: LoginService,
    private userService: UserService,
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
      this.codeImgSrc = "oauth-service/system/code/image?deviceId=wsmhz";
    },1);
  }


  login() {
    if (this.loginForm.valid) {
      let layerId = layer.msg('正在请求登录中···', {
        icon: 16,
        shade: 0.4,
        time:false //取消自动关闭
      });
      this.loginService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.imageCode)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            if (typeof localStorage === 'object') {  //测试该设备环境是否支持缓存
              try {
                let curTime = new Date().getTime();
                localStorage.setItem("authorization",JSON.stringify({
                  access_token:res.data.access_token,
                  token_type: res.data.token_type,
                  refresh_token: res.data.refresh_token,
                  scope: res.data.refresh_token,
                  time:curTime
                }));
                this.userService.getUserInfo()
                  .then(response => {
                    if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
                      localStorage.setItem("user",JSON.stringify({user:response.data,time:curTime}));
                      layer.close(layerId);//手动关闭
                      this.router.navigate(['/home'],{queryParams:{loginFlag:true}});
                    }
                  }).catch(error=>{
                    console.log(error, "获取用户信息失败");
                  });
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
