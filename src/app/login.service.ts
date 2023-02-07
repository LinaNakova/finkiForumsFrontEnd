import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActiveUserInterface} from "./ActiveUserInterface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8080/api/login"
  activeUser: ActiveUserInterface | undefined;
  currentCourse: number | undefined;

  constructor(private http: HttpClient, private router: Router) {
  }

  loginUser(username: string, password: string) {
    const params = new HttpParams()
      .append('username', username)
      .append('password', password);
    console.log("params", params)
    this.http.get<ActiveUserInterface>(this.url, {params:params})
      .subscribe(resp => {
        console.log("Response login", resp);
        this.activeUser = resp;
        console.log("active user", this.activeUser)
        this.router.navigate(['/courses']);
      })
  }

  setCurrentCourse(id: number) : void{
    this.currentCourse = id;
    console.log("Current course is ", id);
  }
}
