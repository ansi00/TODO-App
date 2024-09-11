import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

constructor(private categoryService : CategoryService){

}

color : Array<any> = [
  '#e7845e' , '#fc0184' , '#f6b93f', '#9224a7', '#20c898', '#f03734', '#aad450', '#026467', '#fefefe', '#928779', '#D4D2A5', '#FCDEBE', '#90A583', '#B26E63', '#C6CAED'
];

onSubmit(f:NgForm){
  
let randomNumber = Math.floor(Math.random()* this.color.length);

let todoCategory = {
  category : f.value.categoryName ,
  colorCode : this.color[randomNumber] ,
  todoCount : 0
}

  this.categoryService.saveCategory(todoCategory)

  
}


}
