import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {QuestionInterface} from "./QuestionInterface";
import {AnswerInterface} from "./AnswerInterface";

@Injectable({
  providedIn: 'root'
})
export class AddAnswerService {

  url = "http://localhost:8080/api/answers/add"
  constructor(private http: HttpClient, private router: Router) {
  }

  add(content: string, username: string, questionId: number) {
    const params = new HttpParams()
      .append("content",content)
      .append("username",username)
      .append("questionId",questionId)
    this.http.get<AnswerInterface>(this.url, {params:params})
      .subscribe(resp => {
        this.router.navigate(['/question-details/'+questionId]);
      })
  }
}
