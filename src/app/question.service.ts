import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuestionInterface} from "./QuestionInterface";
import {AnswerInterface} from "./AnswerInterface";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  url = "http://localhost:8080/api/questions"
  answersUrl = "http://localhost:8080/api/answers"
  studentReactsUrl = "http://localhost:8080/api/student-reacts"
  professorReactsUrl = "http://localhost:8080/api/professor-reacts"

  constructor(private http: HttpClient) {
  }

  getAllQuestions(): Observable<QuestionInterface[]> {
    return this.http.get<QuestionInterface[]>(this.url)
  }

  getAllQuestionsForCourse(id: number): Observable<QuestionInterface[]> {
    return this.http.get<QuestionInterface[]>(`${this.url}/${id}`)
  }

  findQuestionById(id: number): Observable<QuestionInterface> {
    return this.http.get<QuestionInterface>(`${this.url}/question/${id}`)
  }

  findAnswersForQuestionWithId(id: number): Observable<AnswerInterface[]> {
    return this.http.get<AnswerInterface[]>(`${this.answersUrl}/question/${id}`)
  }

  findLikesForAnswer(id: number) {
    return this.http.get(`${this.url}/likes/${id}`);
  }


  // @ts-ignore
  likeAnswer(id: number, username: string, role: string){
    if (role == 'PROFESSOR') {
      return this.http.post(`${this.professorReactsUrl}/like/${id}`, username)
    } else if (role == 'STUDENT') {
      return this.http.post(`${this.studentReactsUrl}/like/${id}`, username)
    }
  }


  // @ts-ignore
  unlikeAnswer(id: number, username: string, role: string) {
    if (role == 'PROFESSOR') {
      return this.http.post(`${this.professorReactsUrl}/unlike/${id}`, username)
    } else if (role == 'STUDENT') {
      return this.http.post(`${this.studentReactsUrl}/unlike/${id}`, username)
    }
  }

}
