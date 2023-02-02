import { Component } from '@angular/core';
import {QuestionInterface} from "../QuestionInterface";
import {ActiveUserInterface} from "../ActiveUserInterface";
import {LoginService} from "../login.service";
import {ActivatedRoute} from "@angular/router";
import {AddAnswerService} from "../add-answer.service";

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent {
  content:string | undefined;
  questionId: number | undefined;
  activeUser: ActiveUserInterface | undefined;

  constructor(private addAnswerService:AddAnswerService,
              private loginService: LoginService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.questionId = Number(this.route.snapshot.paramMap.get('id'));
    this.activeUser = this.loginService.activeUser;
  }
  submit(){
    this.addAnswerService.add(this.content!!,this.activeUser!!.username,this.questionId!!)
   }

}
