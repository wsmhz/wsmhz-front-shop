import { Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class CommonUtil{

  constructor(

  ){}

  getUserInfo(){
    return JSON.parse(window.localStorage.getItem("user"));
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
