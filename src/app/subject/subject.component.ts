import { Component } from '@angular/core';
import {StudentCourseInterface} from "../StudentCourseInterface";
import {StudentCourseService} from "../student-course.service";
import {SubjectInterface} from "../subjectInterface";
import {SubjectService} from "../subject.service";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {

  subjects : SubjectInterface[] = []

  constructor(private service: SubjectService) {
  }

  ngOnInit(): void {
    this.service.getAllSubjects()
      .subscribe(subjects => this.subjects = subjects);
  }

}
