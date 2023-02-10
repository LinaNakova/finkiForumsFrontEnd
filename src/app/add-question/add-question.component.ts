import {Component} from '@angular/core';
import {QuestionInterface} from "../QuestionInterface";
import {CourseInterface} from "../courseInterface";
import {ActiveUserInterface} from "../ActiveUserInterface";
import {LoginService} from "../login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AddQuestionService} from "../add-question.service";
import {CategoryInterface} from "../categoryInterface";
import {CategoryService} from "../category.service";


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  title: string | undefined;
  content: string | undefined;
  courseId: number | undefined;
  question: QuestionInterface | undefined;
  course: CourseInterface | undefined;
  activeUser: ActiveUserInterface | undefined;
  categories : CategoryInterface[] =[]
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private addQuestionService: AddQuestionService,
              private categoryService: CategoryService,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.activeUser = this.loginService.activeUser;
    this.categoryService.getAllCategories().subscribe(response => this.categories=response);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: false
    };
    if (!this.activeUser) {
      this.router.navigate(['/'])
    }
  }

  submit() {
    this.addQuestionService.add(this.title!!, this.content!!, this.activeUser!!.username, this.courseId!!,this.selectedItems!!.map(cat => cat.id))
  }
}
