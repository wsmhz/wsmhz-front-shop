import {Injectable} from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class OrderService {

  constructor(
    public httpService : HttpService
  ) { }

  selectAll(pageNum:number,pageSize:number,orderNo?:number,status?:string){
    let url;
    if(orderNo !== null){
      url = "order/page?pageNum="+pageNum+"&pageSize="+pageSize+"&orderNo="+orderNo;
    }else if(status !== null){
      url = "order/page?pageNum="+pageNum+"&pageSize="+pageSize+"&status="+status;
    }else if(orderNo !== null && status !== null){
      url = "order/page?pageNum="+pageNum+"&pageSize="+pageSize+"&orderNo="+orderNo+"&status="+status;
    }else{
      url = "order/page?pageNum="+pageNum+"&pageSize="+pageSize;
    }
    return this.httpService.HttpGet(url);
  }

  select(id:number){
    return this.httpService.HttpGet("order/"+id);
  }

  queryStatus(orderNo:number){
    return this.httpService.HttpGet("order/status/"+orderNo);
  }

  insert(order:Order){
    return this.httpService.HttpPost("order",order);
  }

  pay(order:Order){
    return this.httpService.HttpPost("order/pay",order);
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
