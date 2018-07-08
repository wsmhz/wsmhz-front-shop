import { Component, OnInit } from '@angular/core';
import {CommonUtil} from "../../utils/commonUtil";
import {Router} from "@angular/router";
import {CommonConfig} from "../../config/commonConfig";
import {CategoryService} from "../../service/category/category.service";
import {ProductService} from "../../service/product/product.service";

declare var $:any;
@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css'],
  providers:[
    CategoryService,
    ProductService
  ]
})
export class HotComponent implements OnInit {

  categoryList = [];
  productList = [];
  constructor(
    private commonUtil:CommonUtil,
    private commonConfig:CommonConfig,
    private router:Router,
    private categoryService:CategoryService,
    private productService:ProductService,

  ) { }

  ngOnInit() {
    this.initCategoryList();
  }

  initCategoryList(){
    this.categoryService.selectByParent()
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.categoryList = res.data;
          setTimeout(()=>{
            this.product(-1);
          },500);
        }
      });
  }

  product(index?:number,categoryId?:number){
    if(index===-1){
      $(".item").removeClass('active');
      $("#itemAll").addClass('active');
    }else{
      $(".item").removeClass('active');
      $("#item"+index).addClass('active');
    }
    this.productService.searchSelect(1,10,null,categoryId,"HOT")
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.productList = res.data.list;
        }
      });
  }

  productDetail(id:number){
    this.router.navigate(['/productDetail'],{queryParams:{id:id}});
  }

}
