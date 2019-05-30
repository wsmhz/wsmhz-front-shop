import { Injectable } from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class UserService {

  servicePrefix = "oauth-service";

  constructor(
    private httpService:HttpService
  ) { }

  getUserInfo(){
    return this.httpService.HttpGet('/userInfo', this.servicePrefix);
  }
}
