import { Injectable } from '@angular/core';
import {HttpService} from "../common/http.service";

@Injectable()
export class CartService {

  constructor(
    private httpService : HttpService
  ) { } 

  select(id:number){
    return this.httpService.HttpGet("api/product/"+id);
  }

  delete(id:number){
    return this.httpService.HttpDelete("api/cart/"+id);
  }

  selectAll(userId:number){
    return this.httpService.HttpGet("api/cart/"+userId);
  }

  selectAllChecked(userId:number){
    return this.httpService.HttpGet("api/cart/"+userId+"/checked");
  }

  insert(userId:number,productId:number,quantity:number){
    return this.httpService.HttpPost("api/cart",{
      userId:userId,
      productId:productId,
      quantity:quantity,
      checked:true
    });
  }

  update(id:number,quantity:number){
    return this.httpService.HttpPut("api/cart",{
      id:id,
      quantity:quantity
    });
  }

  updateChecked(id:number,checked:boolean){
    return this.httpService.HttpPut("api/cart",{
      id:id,
      checked:checked
    });
  }
}

export class Cart{
  public id:number;
  public userId:number;
  public productId:number;
  public quantity:number;
  public checked:boolean;
}

