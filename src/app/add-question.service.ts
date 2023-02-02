import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {QuestionInterface} from "./QuestionInterface";

@Injectable({
  providedIn: 'root'
})
export class AddQuestionService {

  url = "http://localhost:8080/api/questions/add"
  constructor(private http: HttpClient, private router: Router) {
  }

  add(title:string,content:string,studentUserame:string,courseId:number){
    const params = new HttpParams()
      .append("title",title)
      .append("content",content)
      .append("studentUserame",studentUserame)
      .append("courseId",courseId)
    this.http.get<QuestionInterface>(this.url, {params:params})
      .subscribe(resp => {
        console.log(resp)
        this.router.navigate(['/details/'+courseId]);
      })
  }
}
