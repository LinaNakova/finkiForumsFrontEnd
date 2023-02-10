import {QuestionInterface} from "./QuestionInterface";
import {CategoryInterface} from "./categoryInterface";

export interface QuestionTaggedWithCategoryInterface {
  id:number,
  question:QuestionInterface,
  category:CategoryInterface
}
