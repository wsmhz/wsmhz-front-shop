import { Injectable } from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class ShippingService {

  constructor(
    public httpService : HttpService
  ) { }

  selectAll(){
    return this.httpService.HttpGet("api/shipping");
  }

  select(id:number){
    return this.httpService.HttpGet("api/shipping/"+id);
  }

  insert(shipping:Shipping){
    return this.httpService.HttpPost("api/shipping",shipping);
  }

  update(shipping:Shipping){
    return this.httpService.HttpPut("api/shipping",shipping);
  }

  delete(id:number){
    return this.httpService.HttpDelete("api/shipping/"+id);
  }

}

export class Shipping{
  public id:number;

  public userId:number;
  /**
   * 收件人姓名
   */
  public receiverName:String;
  /**
   * 固定电话
   */
  public receiverPhone:String;
  /**
   * 移动电话
   */
  public receiverMobile:String;
  /**
   * 省份
   */
  public receiverProvince:String;
  /**
   * 城市
   */
  public receiverCity:String;
  /**
   * 县区
   */
  public receiverDistrict:String ;
  /**
   * 详细地址
   */
  public receiverAddress:String;
  /**
   * 邮编
   */
  public receiverZip:String;
}
