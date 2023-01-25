import { Component } from '@angular/core';
import {LoginService} from "../login.service";
import {ActiveUserInterface} from "../ActiveUserInterface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username:string|undefined;
  password:string|undefined;
  activeUser: ActiveUserInterface | undefined;
  login: boolean | undefined;
  register: boolean | undefined;

  constructor(private service: LoginService, private router: Router) {
  }

  submit(){
      console.log("username and pass", this.username, this.password)
      this.service.loginUser(this.username!!, this.password!!)
  }

  showLogin(){
    this.login = this.login == null ? true : !this.login;
  }

  showRegister(){
    this.register = this.register == null ? true : !this.register;
  }

}
