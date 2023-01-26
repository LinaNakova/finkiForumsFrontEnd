import { Component } from '@angular/core';
import {ActiveUserInterface} from "../ActiveUserInterface";
import {RegisterService} from "../register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
   name:string|undefined;
   lastName:string|undefined;
   email:string|undefined;
   username:string|undefined;
   password:string|undefined;
   userType:string|undefined;
   index:string|undefined;
   activeUser: ActiveUserInterface|undefined;
   register: boolean | undefined;

   constructor(private service:RegisterService, private router:Router) {
   }
  submit(){
    console.log(this.name, this.lastName,this.email,this.username,this.password,this.userType,this.index)
    this.service.registerUser(this.name!!, this.lastName!!,this.email!!,this.username!!,this.password!!,this.userType!!,this.index!!)
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }

  showRegister(){
    this.register = this.register == null ? true : !this.register;
  }
}
