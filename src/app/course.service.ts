import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {CourseInterface} from "./courseInterface";
import {StudentCourseInterface} from "./StudentCourseInterface";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url = "http://localhost:8080/api/courses"

  constructor(private http: HttpClient) {
  }

  getAllCourses(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${this.url}/all`)
  }
  findCourseById(id :number) : Observable<CourseInterface>{
      return this.http.get<CourseInterface>(`${this.url}/course/${id}`);
  }
}
