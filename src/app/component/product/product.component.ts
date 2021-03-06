import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommonUtil} from "../../utils/commonUtil";
import {CommonConfig} from "../../config/commonConfig";
import {ProductService} from "../../service/product/product.service";
import {PageLimit} from "../../utils/functions/functionUtil";
import {CartService} from "../../service/cart/cart.service";

declare var layer:any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[
    ProductService,
    CartService
  ]
})
export class ProductComponent implements OnInit {

  productList = [];

  pages = 1;
  constructor(
    private routeInfo:ActivatedRoute,
    private commonConfig:CommonConfig,
    private commonUtil:CommonUtil,
    private productService:ProductService,
    private cartService:CartService,
    private router:Router,
  ) {
    this.routeInfo.queryParams.subscribe(data=>{
      let keyWord = data.keyWord;
      if( ! this.commonUtil.isNull(keyWord)){
        this.initSearchList(1,10,keyWord,null);
      }
      let categoryId = data.categoryId;
      if( ! this.commonUtil.isNull(categoryId)){
        this.initSearchList(1,10,null,categoryId);
      }
    });
  }

  ngOnInit() {
  }

  initSearchList(pageNum:number,pageSize:number,keyWord:string,categoryId:number){
    this.productService.searchSelect(pageNum,pageSize,keyWord,categoryId)
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.productList = res.data.list;
          this.pages = res.data.pages;

          PageLimit(1,this.pages, this.pages >=5 ? 5 : this.pages,(page) =>{
            this.initSearchList(page,10,keyWord,categoryId);
          });
        }
      });
  }

  addToCart(productId:number){
    let user = this.commonUtil.getUserInfo();
    if(this.commonUtil.isNull(user)){
      this.router.navigate(["/login"]);
    }else{
      this.cartService.insert(user.id,productId,1)
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


  productDetail(id:number){
    this.router.navigate(['/productDetail'],{queryParams:{id:id}});
  }

}
