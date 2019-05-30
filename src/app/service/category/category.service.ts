import { Injectable } from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class CategoryService {

  servicePrefix = "product-service";

  constructor(
    private httpService : HttpService
  ) { }

  selectAll(){
    return this.httpService.HttpGet("api/category", this.servicePrefix);
  }

  selectByParent(){
    return this.httpService.HttpGet("api/category/0", this.servicePrefix);
  }

}
