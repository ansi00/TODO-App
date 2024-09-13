import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryName: string = '';
  dataStatus: string = 'Add';
  catId: string = '';

  color: string[] = [
    '#e7845e',
    '#00CED1',
    '#fc0184',
    '#f6b93f',
    '#9224a7',
    '#20c898',
    '#f03734',
    '#aad450',
    '#026467',
    '#fefefe',
    '#928779',
    '#FCDEBE',
    '#90A583',
    '#B26E63',
    '#C6CAED',
    '#1E90FF',
    '#32CD32',
    '#FF4500',
    '#FFD700',
    '#8A2BE2',
    '#FF6347',
    '#3CB371',
    '#6A5ACD',
    '#D4D2A5',
    '#FF1493',
  ];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.loadCategories().subscribe((val) => {
      this.categories = val;
    });
  }

  onSubmit(f: NgForm): void {
    if (f.valid) {
      if (this.dataStatus == 'Add') {
        let randomNumber = Math.floor(Math.random() * this.color.length);

        let todoCategory = {
          category: f.value.categoryName,
          colorCode: this.color[randomNumber],
          todoCount: 0,
        };

        this.categoryService.saveCategory(todoCategory);
        f.resetForm();
      } else if (this.dataStatus == 'Edit') {
        this.categoryService.updateCategory(this.catId, f.value.categoryName);
        f.resetForm();
        this.dataStatus = 'Add';
      }
    }
  }

  onEdit(category: string, id: string) {
    this.categoryName = category;
    this.dataStatus = 'Edit';
    this.catId = id;
  }

  onDelete(id: string) {
    this.categoryService.deleteCategory(id);
  }
}
