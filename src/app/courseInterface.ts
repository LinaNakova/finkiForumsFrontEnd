import {SubjectInterface} from "./subjectInterface";

export interface CourseInterface{
  id: number,
  name: string,
  description: string,
  subject: SubjectInterface
}
