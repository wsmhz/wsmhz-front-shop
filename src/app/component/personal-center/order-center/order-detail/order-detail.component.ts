import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommonUtil} from "../../../../utils/commonUtil";
import {Order, OrderService} from "../../../../service/order/order.service";
import {CommonConfig} from "../../../../config/commonConfig";

declare var layer:any;
declare var $ :any;
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers:[
    OrderService
  ]
})
export class OrderDetailComponent implements OnInit {

  orderVo : any;
  user = this.commonUtil.getUserInfo();
  constructor(
    private commonUtil:CommonUtil,
    private commonConfig:CommonConfig,
    private router:Router,
    private orderService:OrderService,
    private routeInfo:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.routeInfo.queryParams.subscribe(data=> {
      let id = data.id;
      if(this.commonUtil.isNull(id)){
        layer.msg("订单号为空", {icon: 5});
      }else{
        this.select(id);
      }
    });
  }

  select (id:number){
    this.orderService.select(id).then(res => {
      if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
        this.orderVo = res.data;
        $(".status").removeClass("active");
        $("."+this.orderVo.status).addClass("active"); //状态显示进度
      }
    });
  }

  toPay(orderNo:number){
    this.router.navigate(['/pay'],{queryParams:{orderNo:orderNo}});
  }

  cancel(id:number,orderNo:number){
    let order = new Order();
    order.orderNo = orderNo;
    order.userId = this.user.id;
    layer.msg('确定要取消该订单吗？', {
      time: 0 //不自动关闭
      ,btn: ['确定', '取消']
      ,yes: (index)=>{
        layer.close(index);
        this.orderService.update(order).then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            layer.msg("取消订单成功");
            this.select(id);
          }
        });
      }
    });
  }

}
