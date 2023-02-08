import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {StudentCourseComponent} from "./student-course/student-course.component";
import {QuestionComponent} from "./question/question.component";
import {QuestionDetailsComponent} from "./question-details/question-details.component";
import {SubjectComponent} from "./subject/subject.component";
import {AddQuestionComponent} from "./add-question/add-question.component";
import {AddAnswerComponent} from "./add-answer/add-answer.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {MaterialsComponent} from "./materials/materials.component";
import {AddMaterialComponent} from "./add-material/add-material.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: StudentCourseComponent },
  { path: 'allCourses', component: SubjectComponent },
  { path: 'admin-panel', component: AdminPanelComponent},
  { path: 'add-question/:id', component: AddQuestionComponent},
  { path: 'add-answer/:id', component:AddAnswerComponent},
  { path: 'details/:id', component: QuestionComponent },
  { path: 'question-details/:id', component: QuestionDetailsComponent},
  { path: 'materials/:id', component: MaterialsComponent},
  { path: 'add-materials', component: AddMaterialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
