import {Component, OnInit} from '@angular/core';
import {StudentCourseInterface} from "../StudentCourseInterface";
import {ProfessorCourseInterface} from "../ProfessorCourseInterface";
import {ActiveUserInterface} from "../ActiveUserInterface";
import {StudentCourseService} from "../student-course.service";
import {LoginService} from "../login.service";
import {CourseInterface} from "../courseInterface";
import {CourseService} from "../course.service";
import {Observable} from "rxjs";
import {AddStudentCoursesService} from "../add-student-courses.service";

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  courses: CourseInterface[]=[];

  selectedCourses = [];
  activeUser: ActiveUserInterface | undefined;

  constructor(private service: CourseService,
              private addService: AddStudentCoursesService,
              private loginService: LoginService) {
  }
  ngOnInit():void {
    this.service.getAllCourses().subscribe(courses => this.courses=courses)
    this.activeUser = this.loginService.activeUser!!;
    console.log(this.activeUser)
  }

  checked({id}: { id: any }){
    // @ts-ignore
    if(this.selectedCourses.indexOf(id) != -1){
      return true;
    }
    return false;
  }
  onChange({event, id}: { event: any, id: any }){
    if(event.target.checked){
      // @ts-ignore
      this.selectedCourses.push(id);
    } else {
      // @ts-ignore
      this.selectedCourses.splice(this.selectedCourses.indexOf(id), 1)
    }
  }

  submit(){
    this.activeUser = this.loginService.activeUser!!;
    this.selectedCourses=this.selectedCourses.sort()
    if (this.loginService.activeUser!!.userType == 'STUDENT'){
      for (let course in this.selectedCourses){
        this.addService.addCourseToStudent(this.activeUser.username,course)
      }
    }
    if (this.loginService.activeUser!!.userType == 'PROFESSOR'){
      for (let course in this.selectedCourses){
        this.addService.addCourseToProfessor(this.activeUser.username,course)
      }
    }
  }
}
