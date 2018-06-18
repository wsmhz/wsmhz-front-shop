import { Injectable } from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class CategoryService {

  constructor(
    private httpService : HttpService
  ) { }

  selectAll(){
    return this.httpService.HttpGet("category");
  }

  selectByParent(){
    return this.httpService.HttpGet("category/0");
  }

}
