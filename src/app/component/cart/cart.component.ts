import { Component, OnInit } from '@angular/core';
import {CommonConfig} from "../../config/commonConfig";
import {CommonUtil} from "../../utils/commonUtil";
import {CartService} from "../../service/cart/cart.service";
import {Router} from "@angular/router";

declare var layer:any;
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[
    CartService
  ]
})
export class CartComponent implements OnInit {

  cartProductList = [];
  cartTotalPrice = 0.00;
  user = this.commonUtil.getUserInfo();
  constructor(
    private commonUtil:CommonUtil,
    private commonConfig:CommonConfig,
    private cartService:CartService,
    private router:Router
  ) { }

  ngOnInit(){
    this.initList();
  }

  initList(){
    this.cartService.selectAll(this.user.id)
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.cartProductList = res.data.cartProductList;
          this.cartTotalPrice = res.data.cartTotalPrice;
        }
      });
  }

  sub(id:number,quantity:number){
    quantity -= 1;
    this.updateCart(id,quantity);
  }

  add(id:number,quantity:number){
    quantity += 1;
    this.updateCart(id,quantity);
  }

  quantityChange(index:number,id:number){
    let quantity = $("#qty"+index).val();
    this.updateCart(id,quantity);
  }

  updateCart(id:number,quantity:number){
    this.cartService.update(id,quantity)
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            this.initList();
        }
      });
  }

  checkedChange(id:number,checked:boolean){
    this.cartService.updateChecked(id,checked)
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            this.initList();
        }
      });
  }

  remove(id:number){
    layer.msg('确定删除吗？', {
      time: 0 //不自动关闭
      ,btn: ['确定', '取消']
      ,yes: (index)=>{
        layer.close(index);
        this.cartService.delete(id)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              this.initList();
            }
          });
      }
    });
  }

  figure(){
    let canFigure = false;
    for (let cartProduct of this.cartProductList) {
      if(cartProduct.productChecked){
        canFigure = true;
        break;
      }
    }
    if(canFigure){
      this.router.navigate(['/order']);
    }else {
      layer.msg("请选择要结算的商品", {icon: 5});
    }
  }

}
