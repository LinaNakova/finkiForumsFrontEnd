import {StudentInterface} from "./StudentInterface";
import {CourseInterface} from "./courseInterface";

export interface QuestionInterface{
  id:number,
  title:string,
  content:string
  dateAsked:string,
  student:StudentInterface,
  course: CourseInterface
}
