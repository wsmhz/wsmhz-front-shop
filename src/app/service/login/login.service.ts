import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor() { }

}

export class User {
  constructor(
    public username:string
  ){}
}
