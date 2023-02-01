import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentCourseInterface} from "./StudentCourseInterface";
import {ProfessorCourseInterface} from "./ProfessorCourseInterface";

@Injectable({
  providedIn: 'root'
})
export class AddStudentCoursesService {

  url = "http://localhost:8080/api/student-courses/add"
  urlProf = "http://localhost:8080/api/professor-courses/add"

  constructor(private http: HttpClient) { }

  addCourseToStudent(username: string, selectedCourse: number) :Observable<StudentCourseInterface> {
    const params = new HttpParams().append('username', username).append("selectedCourse",selectedCourse);
    return this.http.get<StudentCourseInterface>(this.url, {params: params})
  }

  addCourseToProfessor(username: string, selectedCourse: number) :  Observable<ProfessorCourseInterface> {
    const params = new HttpParams().append('username', username).append("selectedCourse",selectedCourse);
    return this.http.get<ProfessorCourseInterface>(this.urlProf, {params: params})
  }
}
