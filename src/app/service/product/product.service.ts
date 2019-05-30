import { Injectable } from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class ProductService {

  servicePrefix = "product-service";

  constructor(
    private httpService : HttpService
  ) { }

  searchSelect(pageNum:number,pageSize:number,keyWord?:string,categoryId?:number,flag?:string){
    return this.httpService.HttpPost("api/product",{
      pageNum:pageNum,
      pageSize:pageSize,
      keyWord:keyWord,
      categoryId:categoryId,
      flag:flag
    },this.httpService.formHeader, this.servicePrefix);
  }

  select(id:number){
    return this.httpService.HttpGet("api/product/"+id, this.servicePrefix);
  }

}

export class Product{
  public id:number;
  public categoryId:number;
  public name:string;
  public subtitle:string;
  public mainImage:string;
  public subImages:string;
  public detail:string;
  public price:number;
  public stock:number;
  public status:any;
  public flag:string;
}
