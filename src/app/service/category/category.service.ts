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

}
