import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {Query1Interface} from "./Query1Interface";

import {Query2Interface} from "./Query2Interface";
import {Query3Interface} from "./Query3Interface";
import {Query4Interface} from "./Query4Interface";
import {Query5Interface} from "./Query5Interface";


@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {
  url = "http://localhost:8080/api/admin/admin-panel"

  constructor(private http: HttpClient) {
  }
  getFirstQuery():Observable<Query1Interface[]> {
    return this.http.get<Query1Interface[]>(this.url+'/1')
  }
  getSecondQuery():Observable<Query2Interface[]>{
    return this.http.get<Query2Interface[]>(this.url+'/2')
  }
  getThirdQuery():Observable<Query3Interface[]>{
    return this.http.get<Query3Interface[]>(this.url+'/3')
  }
  getFourthQuery():Observable<Query4Interface[]>{
    return this.http.get<Query4Interface[]>(this.url+'/4')
  }
  getFifthQuery():Observable<Query5Interface[]>{
    return this.http.get<Query5Interface[]>(this.url+'/5')
  }
}
