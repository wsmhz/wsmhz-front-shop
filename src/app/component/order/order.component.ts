import { Component, OnInit } from '@angular/core';
import {CommonUtil} from "../../utils/commonUtil";
import {CommonConfig} from "../../config/commonConfig";
import {CartService} from "../../service/cart/cart.service";
import {Router} from "@angular/router";
import {Order, OrderService} from "../../service/order/order.service";

declare var layer:any;
declare var $: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers:[
    CartService,
    OrderService
  ]
})
export class OrderComponent implements OnInit {

  cartProductList = [];
  cartTotalPrice = 0.00;
  user = this.commonUtil.getUserInfo();
  shippingId:number;
  constructor(
    private commonUtil:CommonUtil,
    private commonConfig:CommonConfig,
    private cartService:CartService,
    private router:Router,
    private orderService:OrderService
  ) { }

  ngOnInit() {
    this.initCartList();
  }

  initCartList(){
    this.cartService.selectAllChecked(this.user.id)
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.cartProductList = res.data.cartProductList;
          this.cartTotalPrice = res.data.cartTotalPrice;
        }
      });
  }

  chooseShipping(shippngId:number){
    this.shippingId= shippngId;
  }

  pay(){
    if(this.commonUtil.isNull(this.user.id)){
      this.router.navigate(['/login']);
    }else{
      let id = layer.msg('正在生成订单中', {
        icon: 16,
        shade: 0.4,
        time:false //取消自动关闭
      });
      let order = new Order();
      order.shippingId = this.shippingId;
      order.userId = this.user.id;
      this.orderService.insert(order)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            layer.close(id);//手动关闭
            layer.msg("创建订单成功", {icon: 6});
            this.router.navigate(['/pay'],{queryParams:{orderNo:res.data}});
          }else{
            layer.close(id);//手动关闭
          }
        }).catch(()=>{layer.close(id);});
    }
  }

}
