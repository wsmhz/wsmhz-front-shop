import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product, ProductService} from "../../service/product/product.service";
import {CommonConfig} from "../../config/commonConfig";
import {CommonUtil} from "../../utils/commonUtil";
import {CartService} from "../../service/cart/cart.service";

declare var layer:any;
declare var $:any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers:[
    ProductService,
    CartService
  ]
})
export class ProductDetailComponent implements OnInit {

  product = new Product();
  subImageList = [];
  quantity = 1;
  constructor(
    private routeInfo:ActivatedRoute,
    private commonUtil:CommonUtil,
    private commonConfig:CommonConfig,
    private productService:ProductService,
    private cartService:CartService,
    private router:Router
  ) { }

  ngOnInit() {
    this.routeInfo.queryParams.subscribe(data=>{
      let id = data.id;
      if( ! this.commonUtil.isNull(id)){
        this.productService.select(id)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              this.product = res.data;
              let imgs = this.product.subImages;
              this.subImageList = imgs.split(",");
              setTimeout(()=>{
                $("#point0").addClass("active");
                $("#img0").addClass("active");
              }, 500);
            }
          });
      }
    });
  }

  sub(){
    if(this.quantity !== 1){
      this.quantity -= 1;
    }
  }

  add(){
    if(this.quantity < this.product.stock){
      this.quantity += 1;
    }
  }

  quantityChange(){
    if(this.quantity >= this.product.stock){
      this.quantity = this.product.stock;
    }
  }

  addToCart(){
    let user = this.commonUtil.getUserInfo();
    if(this.commonUtil.isNull(user)){
      this.router.navigate(["/login"]);
    }else{
      this.cartService.insert(user.id,this.product.id,this.quantity)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            layer.msg('成功加入购物车', {
              time: 0 //不自动关闭
              ,btn: ['查看购物车', '继续购物']
              ,yes: (index)=>{
                layer.close(index);
                this.router.navigate(['/cart']);
              }
            });
          }
        });
    }
  }



}
