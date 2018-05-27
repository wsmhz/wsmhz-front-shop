import { Injectable } from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class LoginService {

  constructor(
    private httpService:HttpService
  ) { }

  login(username:string,password:string,imageCode:string){
    return this.httpService.HttpPost('login',{
      username:username,
      password:password,
      imageCode:imageCode
    },this.httpService.formHeader);
  }

  register(user:User){
    return this.httpService.HttpPost('user/register',user);
  }

  logout(){
    return this.httpService.HttpGet('logout');
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
