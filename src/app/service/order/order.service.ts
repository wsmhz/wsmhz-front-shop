import {Injectable} from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class OrderService {

  servicePrefix = "order-service";

  constructor(
    public httpService : HttpService
  ) { }

  selectAll(pageNum:number,pageSize:number,userId:number,orderNo?:number,status?:string){
    let url;
    if(orderNo !== null){
      url = "api/order/page?pageNum="+pageNum+"&pageSize="+pageSize+"&orderNo="+orderNo+"&userId="+userId;
    }else if(status !== null){
      url = "api/order/page?pageNum="+pageNum+"&pageSize="+pageSize+"&status="+status+"&userId="+userId;
    }else if(orderNo !== null && status !== null){
      url = "api/order/page?pageNum="+pageNum+"&pageSize="+pageSize+"&orderNo="+orderNo+"&status="+status+"&userId="+userId;
    }else{
      url = "api/order/page?pageNum="+pageNum+"&pageSize="+pageSize+"&userId="+userId;
    }
    return this.httpService.HttpGet(url, this.servicePrefix);
  }

  select(id:number){
    return this.httpService.HttpGet("api/order/"+id, this.servicePrefix);
  }

  queryStatus(userId: number, orderNo:number){
    return this.httpService.HttpGet("api/order/status/"+userId+"/"+orderNo, this.servicePrefix);
  }

  queryCreateOrder(queryKey:number){
    return this.httpService.HttpGet("api/order/queue/"+queryKey, this.servicePrefix);
  }

  insert(order:Order){
    return this.httpService.HttpPost("api/order",order,null, this.servicePrefix);
  }

  pay(order:Order){
    return this.httpService.HttpPost("api/order/pay",order, null, this.servicePrefix);
  }

  update(order:Order){
    return this.httpService.HttpPut("api/order",order, null ,this.servicePrefix);
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
