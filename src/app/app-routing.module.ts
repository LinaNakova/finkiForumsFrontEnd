import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {StudentCourseComponent} from "./student-course/student-course.component";
import {QuestionComponent} from "./question/question.component";
import {QuestionDetailsComponent} from "./question-details/question-details.component";
import {RegisterComponent} from "./register/register.component";
import {SubjectComponent} from "./subject/subject.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courses', component: StudentCourseComponent },
  { path: 'allCourses', component: SubjectComponent },
  { path: 'details/:id', component: QuestionComponent },
  { path: 'question-details/:id', component: QuestionDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
