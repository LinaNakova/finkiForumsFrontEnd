import { Component } from '@angular/core';
import {QuestionInterface} from "../QuestionInterface";
import {CourseInterface} from "../courseInterface";
import {ActiveUserInterface} from "../ActiveUserInterface";
import {LoginService} from "../login.service";
import {ActivatedRoute} from "@angular/router";
import {AddQuestionService} from "../add-question.service";


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  title:string | undefined;
  content:string | undefined;
  courseId: number | undefined;
  question: QuestionInterface | undefined;
  course: CourseInterface | undefined;
  activeUser: ActiveUserInterface | undefined;

  constructor(private addQuestionService:AddQuestionService,
              private loginService: LoginService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.activeUser = this.loginService.activeUser;
  }
  submit(){
    this.addQuestionService.add(this.title!!,this.content!!,this.activeUser!!.username,this.courseId!!)
  }
}
