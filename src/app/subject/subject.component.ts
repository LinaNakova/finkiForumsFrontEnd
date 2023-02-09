import {Component, ViewChild} from '@angular/core';
import {SubjectInterface} from "../subjectInterface";
import {SubjectService} from "../subject.service";
import {ActiveUserInterface} from "../ActiveUserInterface";
import {LoginService} from "../login.service";
import {AllCoursesComponent} from "../all-courses/all-courses.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {

  subjects: SubjectInterface[] = [];
  subjectId: number | undefined;
  activeUser: ActiveUserInterface | undefined;
  @ViewChild(AllCoursesComponent) child!: AllCoursesComponent;

  constructor(private service: SubjectService,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activeUser = this.loginService.activeUser!!;
    if (!this.activeUser) {
      this.router.navigate(['/'])
    }
    this.service.getAllSubjects()
      .subscribe(subjects => this.subjects = subjects);
  }

  onChange({event, id}: { event: any, id: any }) {
    if (event.target.checked) {
      // @ts-ignore
      this.subjectId = id
      this.child.loadCourses(id.id);
    } else {
      // @ts-ignore
      this.subjectId = null;
    }
  }

}
