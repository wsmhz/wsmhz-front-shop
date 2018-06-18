import { Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class CommonUtil{

  constructor(

  ){}

  getUserInfo(){
    let userCache = JSON.parse(window.localStorage.getItem("user"));
    if(this.isNull(userCache)){
      return null;
    }else{
      if (new Date().getTime() - userCache.time > 1000*60*60) {//一小时
        console.log('用户信息已过期');
        return null;
      }else{
        return JSON.parse(window.localStorage.getItem("user")).user;
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
