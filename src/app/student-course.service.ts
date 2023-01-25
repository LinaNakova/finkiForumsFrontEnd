import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {StudentCourseInterface} from "./StudentCourseInterface";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProfessorCourseInterface} from "./ProfessorCourseInterface";

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {

  url = "http://localhost:8080/api/student-courses"
  urlProf = "http://localhost:8080/api/professor-courses"
  constructor(private http: HttpClient) { }

  getAllStudentCourses(): Observable<StudentCourseInterface[]> {
    return this.http.get<StudentCourseInterface[]>(`${this.url}/all`)
  }

  getAllCoursesForActiveUserStudent(username:string) :  Observable<StudentCourseInterface[]> {
    const params = new HttpParams().append('username', username);
    return this.http.get<StudentCourseInterface[]>(this.url, {params: params})
  }

  getAllCoursesForActiveUserProfessor(username:string) :  Observable<ProfessorCourseInterface[]> {
    const params = new HttpParams().append('username', username);
    return this.http.get<ProfessorCourseInterface[]>(this.urlProf, {params: params})
  }

}
