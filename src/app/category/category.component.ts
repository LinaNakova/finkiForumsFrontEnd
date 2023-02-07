import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../category.service";
import {CategoryInterface} from "../categoryInterface";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  categories : CategoryInterface[] =[]

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(response => this.categories = response)
  }

}
