import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubjectInterface} from "./subjectInterface";
import {QuestionInterface} from "./QuestionInterface";
import {AnswerInterface} from "./AnswerInterface";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  url = "http://localhost:8080/api/questions"
  answersUrl = "http://localhost:8080/api/answers"
  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<QuestionInterface[]> {
    return this.http.get<QuestionInterface[]>(this.url)
  }
  getAllQuestionsForCourse(id: number): Observable<QuestionInterface[]> {
    return this.http.get<QuestionInterface[]>(`${this.url}/${id}`)
  }
  findQuestionById(id: number): Observable<QuestionInterface>{
    return this.http.get<QuestionInterface>(`${this.url}/question/${id}`)
  }
  findAnswersForQuestionWithId(id: number): Observable<AnswerInterface[]>{
    return this.http.get<AnswerInterface[]>(`${this.answersUrl}/question/${id}`)
  }

}
