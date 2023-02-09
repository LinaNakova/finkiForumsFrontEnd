import {Component} from '@angular/core';
import {QuestionInterface} from "../QuestionInterface";
import {QuestionService} from "../question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../course.service";
import {CourseInterface} from "../courseInterface";
import {LoginService} from "../login.service";
import {ActiveUserInterface} from "../ActiveUserInterface";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  questions: QuestionInterface[] = []
  course: CourseInterface | undefined;
  activeUser: ActiveUserInterface | undefined;

  constructor(private service: QuestionService,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.activeUser = this.loginService.activeUser;
    if (!this.activeUser) {
      this.router.navigate(['/'])
    }
    this.findCourseById(id);
    this.getAllQuestionsForCourse(id);
  }

  findCourseById(id: number) {
    this.courseService.findCourseById(id).subscribe(resp => {
      this.course = resp
    })
  }

  getAllQuestionsForCourse(id: number) {
    this.service.getAllQuestionsForCourse(id).subscribe(questions => this.questions = questions);
  }

}
