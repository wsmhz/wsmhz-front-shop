import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService, User} from "../../../service/login/login.service";
import {equalValidator} from "../../../validators/validator";
import {CommonConfig} from "../../../config/commonConfig";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[
    LoginService
  ]
})
export class RegisterComponent implements OnInit {

  user = new User();
  registerForm:FormGroup;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private commonConfig:CommonConfig
  ) {
    this.registerForm = new FormBuilder().group({
      username: ['', Validators.required],
      passwordsGroup: new FormBuilder().group({
        password: ['', [Validators.required,Validators.minLength(6)]],
        pconfirm: ['']
      }, {validator: equalValidator})
    });
  }

  ngOnInit() {
  }

  register(){
    if(this.registerForm.valid){
      this.loginService.register(this.user)
        .then(res => {
          if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            history.go(-1);
          }
        });
    }
  }

}
