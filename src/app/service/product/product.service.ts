import { Injectable } from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class ProductService {

  constructor(
    private httpService : HttpService
  ) { }

  searchSelect(pageNum:number,pageSize:number,keyWord?:string,categoryId?:number){
    return this.httpService.HttpGet("product?pageNum="+pageNum+"&pageSize="+pageSize+"&keyWord="+keyWord+"&categoryId="+categoryId);
  }

}
