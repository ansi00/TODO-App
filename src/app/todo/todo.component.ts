import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import {Todo} from '../models/todo.model'



@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

catId : string  = '' ;
todos : Todo[] = [];
todoValue:string = '';
dataStatus : string = 'Add';
todoId : string = ''

constructor(private todoService : TodoService, private activatedRoute : ActivatedRoute){}

ngOnInit(): void {
  this.catId = this.activatedRoute.snapshot.paramMap.get('id')! ;

  this.todoService.loadTodos(this.catId).subscribe(val =>{
this.todos = val;
  })
}


onSubmit(f: NgForm):void{

if(this.dataStatus == 'Add'){
  let todo = {
    todoText : f.value.todoText,
    isCompleted : false
  }
  this.todoService.saveTodo(this.catId,todo);
  f.resetForm();
}
else if(this.dataStatus == 'Edit'){
  this.todoService.updateTodo(this.catId,this.todoId, f.value.todoText);
        f.resetForm();
        this.dataStatus = 'Add';
}


}

onEdit(todoText: string, id: string) {
  this.todoValue = todoText;
  this.dataStatus = 'Edit';
  this.todoId = id;
}

onDelete( todoId : string) {
  this.todoService.deleteTodo(this.catId, todoId);
}

completeTodo(todoId:string){
this.todoService.markComplete(this.catId,todoId)
}

unCompleteTodo(todoId:string){
  this.todoService.markUnComplete(this.catId,todoId)
  }

}
