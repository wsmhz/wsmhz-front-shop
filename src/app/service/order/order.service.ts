import {Injectable} from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class OrderService {

  constructor(
    public httpService : HttpService
  ) { }

  selectAll(){
    return this.httpService.HttpGet("order");
  }

  select(id:number){
    return this.httpService.HttpGet("order/"+id);
  }

  insert(order:Order){
    return this.httpService.HttpPost("order",order);
  }

  update(order:Order){
    return this.httpService.HttpPut("order",order);
  }

}

export class Order{

  public id:number;
  /**
   * 订单号
   */
  public orderNo:number;
  /**
   * 用户id
   */
  public userId:number;
  /**
   * 收货地址id
   */
  public shippingId:number;
  /**
   * 支付金额
   */
  public payment:number;
  /**
   * 支付方式
   */
  public paymentType:string;
  /**
   * 邮费
   */
  public postage:number;
  /**
   * 订单状态
   */
  public status:string;
  /**
   * 支付时间
   */
  public paymentTime:string;
  /**
   * 发货时间
   */
  public sendTime:string;
  /**
   * 交易完成时间
   */
  public endTime:string;
  /**
   * 交易关闭时间
   */
  public closeTime:string;
}
