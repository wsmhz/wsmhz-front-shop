import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css']
})
export class HotComponent implements OnInit {

  categoryList = [];
  classNameTemp = '';
  constructor() { }

  ngOnInit() {
  }

  change(className:string){
    // $(".product").removeClass(this.classNameTemp);
    // $(".product").addClass(className);
    // this.classNameTemp = className;
  }

}
