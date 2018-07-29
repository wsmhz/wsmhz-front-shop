import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order/order.service";
import {CommonUtil} from "../../../utils/commonUtil";
import {CommonConfig} from "../../../config/commonConfig";
import {PageLimit} from "../../../utils/functions/functionUtil";
import {Router} from "@angular/router";

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
  searchOrderNo:number;

  pages = 1;
  constructor(
    private orderService:OrderService,
    private commonUtil:CommonUtil,
    private commonConfig:CommonConfig,
    private router:Router,
  ) { }

  search(){
      this.initOrderList(1,10,$.trim(this.searchOrderNo),null);

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
          this.pages = res.data.pages;
          PageLimit(pageNum,this.pages, this.pages >=5 ? 5 : this.pages,(page) =>{
            this.initOrderList(page,10,orderNo,status);
          });
        }
      });
  }

  orderDetail(id:number){
    this.router.navigate(['/personalCenter/orderDetail'],{queryParams:{id:id}});
  }





}
