import {Component, Input, OnInit} from '@angular/core';
import {ActiveUserInterface} from "../ActiveUserInterface";
import {LoginService} from "../login.service";
import {CourseInterface} from "../courseInterface";
import {CourseService} from "../course.service";
import {AddStudentCoursesService} from "../add-student-courses.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  courses: CourseInterface[] = [];

  selectedCourses = [];
  activeUser: ActiveUserInterface | undefined;
  @Input() subjectId: number | undefined;

  constructor(private service: CourseService,
              private addService: AddStudentCoursesService,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service.getAllCourses().subscribe(courses => this.courses = courses)
    this.activeUser = this.loginService.activeUser!!;
    if (!this.activeUser) {
      this.router.navigate(['/'])
    }
  }

  loadCourses(subjectId: number) {
    this.service.findCoursesBySubjectId(subjectId).subscribe(courses => this.courses = courses);
  }

  checked({id}: { id: any }) {
    // @ts-ignore
    if (this.selectedCourses.indexOf(id) != -1) {
      return true;
    }
    return false;
  }

  onChange({event, id}: { event: any, id: any }) {
    if (event.target.checked) {
      // @ts-ignore
      this.selectedCourses.push(id.id);
    } else {
      // @ts-ignore
      this.selectedCourses.splice(this.selectedCourses.indexOf(id.id), 1)
    }
  }

  submit() {
    this.activeUser = this.loginService.activeUser!!;
    this.selectedCourses = this.selectedCourses.sort()
    if (this.loginService.activeUser!!.userType == 'STUDENT') {
      for (let course of this.selectedCourses) {
        this.addService.addCourseToStudent(this.activeUser.username, +course)
          .subscribe(() => this.router.navigate(['/courses']));
      }
    }
    if (this.loginService.activeUser!!.userType == 'PROFESSOR') {
      for (let course of this.selectedCourses) {
        this.addService.addCourseToProfessor(this.activeUser.username, +course)
          .subscribe(() => this.router.navigate(['/courses']));
      }
    }
  }
}
