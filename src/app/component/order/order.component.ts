import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class OrderComponent implements OnInit,OnDestroy {

  cartProductList = [];
  cartTotalPrice = 0.00;
  user = this.commonUtil.getUserInfo();
  shippingId:number;
  queryCreateOrderTimer:any;
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
      let layerId = layer.msg('正在排队生成订单中', {
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
            let queryKey = res.data;
            this.queryCreateOrderTimer = setInterval(()=>{
              this.orderService.queryCreateOrder(queryKey).then(response => {
                if(response.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
                  if(!this.commonUtil.isNull(response.data)){
                    layer.close(layerId);//手动关闭
                    this.router.navigate(['/pay'],{queryParams:{orderNo:response.data}});
                  }
                }
              });
            },1500);
          }else{
            layer.close(layerId);//手动关闭
          }
        }).catch(()=>{layer.close(layerId);});
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.queryCreateOrderTimer);
  }

}
