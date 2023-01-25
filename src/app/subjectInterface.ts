import {AdminInterface} from "./AdminInterface";

export interface SubjectInterface{
  id: number,
  name: string,
  admin: AdminInterface
}
