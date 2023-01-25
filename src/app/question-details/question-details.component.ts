import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../question.service";
import {QuestionInterface} from "../QuestionInterface";
import {ActivatedRoute} from "@angular/router";
import {AnswerInterface} from "../AnswerInterface";

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit{
  question: QuestionInterface | undefined
  answers: AnswerInterface[] =[]

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.findQuestionById(id);
  }

  findQuestionById(id : number){
    this.questionService.findQuestionById(id)
      .subscribe(resp => {
        this.question = resp;
        this.questionService.findAnswersForQuestionWithId(id).subscribe(resp=>{this.answers = resp})
      })
  }

}
