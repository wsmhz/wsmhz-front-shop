import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order/order.service";
import {CommonUtil} from "../../../utils/commonUtil";
import {CommonConfig} from "../../../config/commonConfig";

declare var $:any;
@Component({
  selector: 'app-order-center',
  templateUrl: './order-center.component.html',
  styleUrls: ['./order-center.component.css'],
  providers:[
    OrderService
  ]
})
export class OrderCenterComponent implements OnInit {

  orderList = [];
  serarchOrderNo:number;
  constructor(
    private orderService:OrderService,
    private commonUtil:CommonUtil,
    private commonConfig:CommonConfig,
  ) { }

  search(){
    if( ! this.commonUtil.isNull(this.serarchOrderNo)){
      this.initOrderList(1,10,$.trim(this.serarchOrderNo),null);
    }
  }

  ngOnInit() {
    $(function () {
      $(".item").click(function(){
        $(this).addClass("active").siblings(".item").removeClass("active");
      });
    });
    this.initOrderList(1,10,null,null);
  }

  initOrderList(pageNum:number,pageSize:number,orderNo?:number,status?:string){
    this.orderService.selectAll(pageNum,pageSize,orderNo,status)
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.orderList = res.data.list;
        }
      });
  }



}
