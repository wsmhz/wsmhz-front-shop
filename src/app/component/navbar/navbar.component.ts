import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup;
  constructor(
    private router:Router
  ) {
    this.searchForm = new FormBuilder().group({
      keyWord: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  search(){
    if(this.searchForm.valid){
      this.router.navigate(['/product'],{queryParams:{keyWord:this.searchForm.value.keyWord}});
    }
  }

}
