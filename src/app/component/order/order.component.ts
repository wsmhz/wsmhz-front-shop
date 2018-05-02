import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init(){
    $(function(){
      $(".address-item").click(function(){
        $(this).addClass("active").siblings(".address-item").removeClass("active");
      });



    });
  }

}
