import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentCourseComponent } from './student-course/student-course.component';
import {HttpClientModule} from "@angular/common/http";
import { SubjectComponent } from './subject/subject.component';
import { QuestionComponent } from './question/question.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { RegisterComponent } from './register/register.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AddAnswerComponent } from './add-answer/add-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentCourseComponent,
    SubjectComponent,
    QuestionComponent,
    LoginComponent,
    QuestionDetailsComponent,
    RegisterComponent,
    AllCoursesComponent,
    AddQuestionComponent,
    AddAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
