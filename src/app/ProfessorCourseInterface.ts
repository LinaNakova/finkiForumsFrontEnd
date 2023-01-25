import {CourseInterface} from "./courseInterface";
import {ProfessorInterface} from "./ProfessorInterface";

export interface ProfessorCourseInterface{
  id?: number,
  professor: ProfessorInterface,
  course: CourseInterface,
}
