import {Component, OnInit} from '@angular/core';
import {StudentCourseService} from "../student-course.service";
import {StudentCourseInterface} from "../StudentCourseInterface";
import {LoginService} from "../login.service";
import {ProfessorCourseInterface} from "../ProfessorCourseInterface";
import {ActiveUserInterface} from "../ActiveUserInterface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {

  studentCourses: StudentCourseInterface[] = []
  professorCourses: ProfessorCourseInterface[] = []
  activeUser: ActiveUserInterface | undefined;

  constructor(private service: StudentCourseService,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activeUser = this.loginService.activeUser!!;
    if (!this.activeUser) {
      this.router.navigate(['/'])
    }
    // console.log("username", this.activeUser.username)
    if (this.loginService.activeUser!!.userType == 'STUDENT')
      this.service.getAllCoursesForActiveUserStudent(this.activeUser.username)
        .subscribe(studentCourses => this.studentCourses = studentCourses);
    if (this.activeUser.userType == 'PROFESSOR')
      this.service.getAllCoursesForActiveUserProfessor(this.activeUser.username)
        .subscribe(professorCourses => this.professorCourses = professorCourses);
  }

  saveCourseAsCurrent(id: number): void {
    console.log("course id", id)
    this.loginService.setCurrentCourse(id);
  }


}
