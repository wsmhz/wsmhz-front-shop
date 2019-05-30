import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
@Injectable()
export class CommonUtil{

  constructor(
    private router: Router
  ){}

  getUserInfo(){
    let userCache = JSON.parse(localStorage.getItem("user"));
    if(this.isNull(userCache)){
      this.router.navigate(["/login"]);
      return null;
    }else{
      if (new Date().getTime() - userCache.time > 1000*60*60) {//一小时
        console.log('用户信息已过期');
        this.router.navigate(["/login"]);
        return null;
      }else{
        return JSON.parse(localStorage.getItem("user")).user;
      }
    }
  }

  getAuthorization(){
    let authorizationCache = JSON.parse(localStorage.getItem("authorization"));
    if(this.isNull(authorizationCache)){
      this.router.navigate(["/login"]);
      return null;
    }else{
      if (new Date().getTime() - authorizationCache.time > 1000*60*60) {//一小时
        console.log('authorizationCache已过期');
        this.router.navigate(["/login"]);
        return null;
      }else{
        return JSON.parse(localStorage.getItem("authorization"));
      }
    }
  }

  getDateFormatter(){
    return "yyyy-MM-dd HH:mm:ss";
  }

  /**
   * 判断是否为空
   * @param data 数据
   */
  isNull (data){
    if(data == null || data === '' || typeof data === 'undefined'){
      return true;
    }else{
      return false;
    }
  }




}
