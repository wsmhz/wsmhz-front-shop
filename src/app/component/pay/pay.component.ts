import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonConfig} from "../../config/commonConfig";
import {Order, OrderService} from "../../service/order/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonUtil} from "../../utils/commonUtil";

declare var layer:any;
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
  providers:[
    OrderService
  ]
})
export class PayComponent implements OnInit,OnDestroy{

  user = this.commonUtil.getUserInfo();
  img = "";
  orderNo = "";
  payedFlag = true;
  queryStatusTimer:any;
  constructor(
    private commonUtil:CommonUtil,
    private commonConfig:CommonConfig,
    private router:Router,
    private orderService:OrderService,
    private routeInfo:ActivatedRoute,
  ) {}

  ngOnInit() {
    // this.payedFlag = false;
    // this.routeInfo.queryParams.subscribe(data=>{
    //   let orderNo = data.orderNo;
    //   if(this.commonUtil.isNull(orderNo)){
    //     layer.msg("订单号为空", {icon: 5});
    //   }else{
    //     let order = new Order();
    //     order.userId = this.user.id;
    //     order.orderNo = orderNo;
    //     this.orderService.pay(order).then(response => {
    //       if(response.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
    //           this.img = response.data.qrCodeUrl;
    //           this.orderNo = response.data.orderNo;
    //           this.queryStatusTimer = setInterval(()=>{
    //             this.orderService.queryStatus(orderNo).then(resp => {
    //               if(resp.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
    //                 if((!this.commonUtil.isNull(resp.data)) && resp.data >= 20){
    //                   clearInterval(this.queryStatusTimer);
    //                   this.payedFlag = true;
    //                 }
    //               }
    //             });
    //           },1500);
    //       }
    //     });
    //   }
    // });
  }

  ngOnDestroy(): void {
    clearInterval(this.queryStatusTimer);
  }


}
