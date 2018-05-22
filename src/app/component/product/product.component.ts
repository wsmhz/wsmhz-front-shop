import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
  constructor(
    private routeInfo:ActivatedRoute,
    private commonConfig:CommonConfig,
    private commonUtil:CommonUtil,
    private productService:ProductService
  ) {
    let keyWord = this.routeInfo.snapshot.queryParams['keyWord'];
    if( ! this.commonUtil.isNull(keyWord)){
      this.productService.searchSelect(1,10,keyWord)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            this.productList = res.data;
            console.log(this.productList);
          }
        });
    }
  }

  ngOnInit() {
  }

}
