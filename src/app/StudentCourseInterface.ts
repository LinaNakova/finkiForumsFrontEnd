import {StudentInterface} from "./StudentInterface";
import {CourseInterface} from "./courseInterface";

export interface StudentCourseInterface {
  id:number,
  student: StudentInterface,
  course: CourseInterface
}
