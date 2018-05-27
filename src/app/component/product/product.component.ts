import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommonUtil} from "../../utils/commonUtil";
import {CommonConfig} from "../../config/commonConfig";
import {ProductService} from "../../service/product/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[
    ProductService
  ]
})
export class ProductComponent implements OnInit {

  productList = [];
  hasPreviousPage = false;
  hasNextPage = true;
  pageNum = 1;
  constructor(
    private routeInfo:ActivatedRoute,
    private commonConfig:CommonConfig,
    private commonUtil:CommonUtil,
    private productService:ProductService,
    private router:Router,
  ) {
    this.routeInfo.queryParams.subscribe(data=>{
      let keyWord = data.keyWord;
      if( ! this.commonUtil.isNull(keyWord)){
        this.productService.searchSelect(1,10,keyWord)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              this.productList = res.data.list;
              this.hasPreviousPage = res.data.hasPreviousPage;
              this.hasNextPage = res.data.hasNextPage;
              this.pageNum = res.data.pageNum;
            }
          });
      }
      let categoryId = data.categoryId;
      if( ! this.commonUtil.isNull(categoryId)){
        this.productService.searchSelect(1,10,null,categoryId)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              this.productList = res.data.list;
              this.hasPreviousPage = res.data.hasPreviousPage;
              this.hasNextPage = res.data.hasNextPage;
              this.pageNum = res.data.pageNum;
            }
          });
      }
    });
  }

  ngOnInit() {
  }


  productDetail(id:number){
    this.router.navigate(['/productDetail'],{queryParams:{id:id}});
  }

}
