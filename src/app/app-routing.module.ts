import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/system/login/login.component";
import {RegisterComponent} from "./component/system/register/register.component";
import {Code404Component} from "./component/system/code404/code404.component";
import {ProductComponent} from "./component/product/product.component";
import {ProductDetailComponent} from "./component/product-detail/product-detail.component";
import {CartComponent} from "./component/cart/cart.component";
import {OrderComponent} from "./component/order/order.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component : HomeComponent},
  {path: 'product', component : ProductComponent},
  {path: 'productDetail', component : ProductDetailComponent},
  {path: 'cart', component : CartComponent},
  {path: 'order', component : OrderComponent},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},
  {path: '**', component : Code404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
