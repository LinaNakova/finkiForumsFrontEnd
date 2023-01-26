import { Injectable } from '@angular/core';
import {ActiveUserInterface} from "./ActiveUserInterface";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = "http://localhost:8080/api/register"
  activeUser: ActiveUserInterface | undefined;
  constructor(private http:HttpClient, private router: Router) {
  }
  registerUser(name:string, lastName:string, email:string, username:string, password:string, userType:string, index:string){
    const params = new HttpParams()
      .append("name",name)
      .append("lastName",lastName)
      .append("email",email)
      .append("username",username)
      .append("password",password)
      .append("userType",userType)
      .append("index",index);
    console.log("params",params)
    this.http.get<ActiveUserInterface>(this.url,{params:params})
      .subscribe(resp =>{
        console.log("Response register",resp)
        this.activeUser = resp;
        console.log("active user", this.activeUser)
        this.router.navigate(['/allCourses']);
      })
  }
}
