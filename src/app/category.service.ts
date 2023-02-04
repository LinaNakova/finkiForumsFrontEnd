import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryInterface} from "./categoryInterface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "http://localhost:8080/api/categories"

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(`${this.url}/all`)
  }
}
