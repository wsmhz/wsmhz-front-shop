import { Injectable } from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class ProductService {

  constructor(
    private httpService : HttpService
  ) { }

  searchSelect(pageNum:number,pageSize:number,keyWord?:string,categoryId?:number){
    return this.httpService.HttpPost("product",{
      pageNum:pageNum,
      pageSize:pageSize,
      keyWord:keyWord,
      categoryId:categoryId
    },this.httpService.formHeader);
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
