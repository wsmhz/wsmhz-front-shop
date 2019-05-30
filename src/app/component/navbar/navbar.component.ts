import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute,Router} from "@angular/router";
import {CategoryService} from "../../service/category/category.service";
import {CommonConfig} from "../../config/commonConfig";
import {CommonUtil} from "../../utils/commonUtil";
import {LoginService} from "../../service/login/login.service";
import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[
    CategoryService,
    LoginService
  ]
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup;
  categoryList = [];
  user = this.commonUtil.getUserInfo();
  constructor(
    private router:Router,
    private routeInfo:ActivatedRoute,
    private categoryService:CategoryService,
    private commonConfig:CommonConfig,
    private commonUtil:CommonUtil,
  private loginService: LoginService,
  ) {
    this.searchForm = new FormBuilder().group({
      keyWord: ['', Validators.required]
    });
        this.routeInfo.queryParams.subscribe((data)=>{
          let loginFlag = data.loginFlag;
          if( ! this.commonUtil.isNull(loginFlag)){
            console.log(this.commonUtil.getUserInfo());
           this.user = this.commonUtil.getUserInfo();
          }
        });
  }

  ngOnInit() {
    this.initCategoryList();
  }

  initCategoryList(){
    this.categoryService.selectAll()
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          this.categoryList = res.data;
        }
      });
  }

  search(){
    if(this.searchForm.valid){
      this.router.navigate(['/product'],{queryParams:{keyWord:this.searchForm.value.keyWord}});
    }
  }

  goProductList(categoryId:number){
    this.router.navigate(['/product'],{queryParams:{categoryId:categoryId}});
  }

  logout(){
    this.loginService.logout()
      .then(res=>{
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          localStorage.removeItem("user");
          localStorage.removeItem("authorization");
          this.user = this.commonUtil.getUserInfo();
          this.router.navigate(['login']);
        }
      });
  }

}
