import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../question.service";
import {QuestionInterface} from "../QuestionInterface";
import {ActivatedRoute, Router} from "@angular/router";
import {AnswerInterface} from "../AnswerInterface";
import {LoginService} from "../login.service";
import {ActiveUserInterface} from "../ActiveUserInterface";

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  question: QuestionInterface | undefined
  answers: AnswerInterface[] = []
  answersLikes = new Map<number, number>()
  activeUser: ActiveUserInterface | undefined;

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.findQuestionById(id);
    this.activeUser = this.loginService.activeUser;
    if (!this.activeUser) {
      this.router.navigate(['/'])
    }
  }

  findQuestionById(id: number) {
    this.questionService.findQuestionById(id)
      .subscribe(resp => {
        this.question = resp;
        this.questionService.findAnswersForQuestionWithId(id)
          .subscribe(resp => {
            this.answers = resp;
            this.findLikesForAnswers()
          })
      });
  }

  findLikesForAnswers() {
    this.answers.forEach(answer =>
      this.questionService.findLikesForAnswer(answer.id)
        .subscribe(number => this.answersLikes.set(answer.id, +number))
    )
  }

  likeAnswer(id: number) {
    // @ts-ignore
    this.questionService.likeAnswer(id, this.activeUser!!.username, this.activeUser!!.userType)
      .subscribe(number => {
        this.answersLikes.delete(id);
        this.answersLikes.set(id, +number);
      })
  }

  unlikeAnswer(id: number) {
    // @ts-ignore
    this.questionService.unlikeAnswer(id, this.activeUser!!.username, this.activeUser!!.userType)
      .subscribe(number => {
        this.answersLikes.delete(id);
        this.answersLikes.set(id, +number);
      })
  }

}
