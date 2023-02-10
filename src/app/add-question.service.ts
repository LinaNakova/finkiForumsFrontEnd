import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {QuestionInterface} from "./QuestionInterface";
import {QuestionTaggedWithCategoryInterface} from "./question-tagged-with-category-interface";

@Injectable({
  providedIn: 'root'
})
export class AddQuestionService {

  url = "http://localhost:8080/api/questions/add"
  taggingUrl = "http://localhost:8080/api/tagged-questions/add/"
  constructor(private http: HttpClient, private router: Router) {
  }

  add(title:string,content:string,studentUserame:string,courseId:number,categories:number[]){
    const params = new HttpParams()
      .append("title",title)
      .append("content",content)
      .append("studentUserame",studentUserame)
      .append("courseId",courseId)
    this.http.get<QuestionInterface>(this.url, {params:params})
      .subscribe(resp => {
        const taggingParams= new HttpParams()
          .append("questionId",resp.id)
        for(let category of categories){
          this.http.get<QuestionTaggedWithCategoryInterface>(this.taggingUrl+category,{params:taggingParams})
            .subscribe(resp => {
              console.log(resp)
            })
        }
        this.router.navigate(['/details/'+courseId]);
      })
  }
}
