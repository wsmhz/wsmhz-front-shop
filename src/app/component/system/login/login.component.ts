import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {User} from "../../../service/login/login.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;
  loginForm:FormGroup;
  constructor(
  ) { }

  ngOnInit() {
    // this.loginForm = new FormBuilder().group({
    //   username: [this.user.username, [Validators.required]]
    //   // password: [this.admin.password, Validators.required]
    // });
  }


  login(){
    alert("1");
  }
  a(){
    alert("a");
  }
}
