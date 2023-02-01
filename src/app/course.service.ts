import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CourseInterface} from "./courseInterface";

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
  findCoursesBySubjectId(id : number) : Observable<CourseInterface[]> {
  return this.http.get<CourseInterface[]>(`${this.url}/by-subject/${id}`)
}
  findCourseById(id :number) : Observable<CourseInterface>{
      return this.http.get<CourseInterface>(`${this.url}/course/${id}`);
  }
}
