import { Component } from '@angular/core';
import {LoginService} from "../login.service";
import {ActiveUserInterface} from "../ActiveUserInterface";
import {Router} from "@angular/router";
import {RegisterService} from "../register.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name:string|undefined;
  lastName:string|undefined;
  email:string|undefined;
  username:string|undefined;
  password:string|undefined;
  userType:string|undefined;
  index:string|undefined;
  activeUser: ActiveUserInterface | undefined;
  login: boolean | undefined;
  register: boolean | undefined;

  constructor(private service: LoginService, private registerService: RegisterService, private router: Router) {
  }

  submitLogin(){
      console.log("username and pass", this.username, this.password)
      this.service.loginUser(this.username!!, this.password!!)
  }
  submitRegister(){
    console.log(this.name, this.lastName,this.email,this.username,this.password,this.userType,this.index)
    this.registerService.registerUser(this.name!!, this.lastName!!,this.email!!,this.username!!,this.password!!,this.userType!!,this.index!!)
  }
  showLogin(){
    this.login = this.login == null ? true : !this.login;
  }

  showRegister(){
    this.register = this.register == null ? true : !this.register;
  }

}
