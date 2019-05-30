import { Injectable } from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class CartService {

  servicePrefix = "product-service";

  constructor(
    private httpService : HttpService
  ) { } 

  select(id:number){
    return this.httpService.HttpGet("api/product/"+id, this.servicePrefix);
  }

  delete(id:number){
    return this.httpService.HttpDelete("api/cart/"+id, this.servicePrefix);
  }

  selectAll(userId:number){
    return this.httpService.HttpGet("api/cart/"+userId, this.servicePrefix);
  }

  selectAllChecked(userId:number){
    return this.httpService.HttpGet("api/cart/"+userId+"/checked", this.servicePrefix);
  }

  insert(userId:number,productId:number,quantity:number){
    return this.httpService.HttpPost("api/cart",{
      userId:userId,
      productId:productId,
      quantity:quantity,
      checked:true
    },null, this.servicePrefix);
  }

  update(id:number,quantity:number){
    return this.httpService.HttpPut("api/cart",{
      id:id,
      quantity:quantity
    },null, this.servicePrefix);
  }

  updateChecked(id:number,checked:boolean){
    return this.httpService.HttpPut("api/cart",{
      id:id,
      checked:checked
    }, null ,this.servicePrefix);
  }
}

export class Cart{
  public id:number;
  public userId:number;
  public productId:number;
  public quantity:number;
  public checked:boolean;
}

