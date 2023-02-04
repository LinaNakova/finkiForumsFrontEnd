import {QuestionInterface} from "./QuestionInterface";
import {ProfessorInterface} from "./ProfessorInterface";
import {StudentInterface} from "./StudentInterface";

export interface AnswerInterface{
  id:number,
  content?: string,
  valid?: string,
  dateAnswered?: string,
  question?: QuestionInterface,
  professor?: ProfessorInterface,
  student?: StudentInterface
}
