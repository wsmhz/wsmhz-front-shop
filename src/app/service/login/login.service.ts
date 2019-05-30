import { Injectable } from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class LoginService {

  servicePrefix = "oauth-service";

  constructor(
    private httpService:HttpService
  ) { }

  login(username:string,password:string,imageCode:string){
    return this.httpService.HttpPost('system/login',{
      username:"user_" + username,
      password:password,
      imageCode:imageCode,
      deviceId: 'wsmhz'
    },this.httpService.formHeader, this.servicePrefix);
  }

  register(user:User){
    return this.httpService.HttpPost('register',user, null, this.servicePrefix);
  }

  logout(){
    return this.httpService.HttpGet('logout', this.servicePrefix);
  }

}

export class User {
  public username:string;
  public password:string;
  public status:boolean;
  public email:string;
  public phone:string;
  public pconfirm:string;
}
