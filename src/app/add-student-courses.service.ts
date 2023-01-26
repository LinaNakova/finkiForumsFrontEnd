import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentCourseInterface} from "./StudentCourseInterface";
import {ProfessorCourseInterface} from "./ProfessorCourseInterface";
import {ActiveUserInterface} from "./ActiveUserInterface";

@Injectable({
  providedIn: 'root'
})
export class AddStudentCoursesService {

  url = "http://localhost:8080/api/student-courses/add"
  urlProf = "http://localhost:8080/api/professor-courses/add"

  constructor(private http: HttpClient) { }

  addCourseToStudent(username: string, selectedCourse: string) {
    const params = new HttpParams().append('username', username).append("selectedCourse",selectedCourse);
    this.http.get<StudentCourseInterface>(this.url, {params: params}).subscribe(resp=>{
      console.log("Response add",resp)
    })
  }

  addCourseToProfessor(username: string, selectedCourse: string) :  Observable<ProfessorCourseInterface> {
    const params = new HttpParams().append('username', username).append("selectedCourses",selectedCourse);
    return this.http.get<ProfessorCourseInterface>(this.urlProf, {params: params})
  }
}
