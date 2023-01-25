import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentCourseInterface} from "./StudentCourseInterface";
import {SubjectInterface} from "./subjectInterface";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  url = "http://localhost:8080/api/subjects/all"
  constructor(private http: HttpClient) { }

  getAllSubjects(): Observable<SubjectInterface[]> {
    return this.http.get<SubjectInterface[]>(this.url)
  }
}
