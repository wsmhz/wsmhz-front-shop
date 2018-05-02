import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { Code404Component } from './component/system/code404/code404.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { AdvertisementComponent } from './component/advertisement/advertisement.component';
import { HotComponent } from './component/hot/hot.component';
import { OtherComponent } from './component/other/other.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/system/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/system/register/register.component';
import { ProductComponent } from './component/product/product.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    AdvertisementComponent,
    HotComponent,
    OtherComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProductComponent,
    Code404Component,
    ProductDetailComponent,
    CartComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
