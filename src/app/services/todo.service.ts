import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, collectionData, deleteDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { increment } from 'firebase/firestore'; 
import { Observable, map} from 'rxjs';
import { Todo } from '../models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private firestore: Firestore, private toastr: ToastrService) { }

  saveTodo(id: string, data: any): void {
    const categoryDocRef = doc(this.firestore, `categories/${id}`);
    const todosCollectionRef = collection(categoryDocRef, 'todos');

    addDoc(todosCollectionRef, data)
      .then(() => {
        updateDoc(categoryDocRef, { todoCount: increment(1) })
          .then(() => {
            this.toastr.success("New Todo Saved Successfully");
          })
          .catch((err) => {
            console.error("Error updating todo count: ", err);
          });
      })
      .catch((err) => {
        console.error("Error adding todo: ", err);
      });
  }



  loadTodos(id: string): Observable<Todo[]> {
    const categoryDocRef = doc(this.firestore, `categories/${id}`);
    const todosCollectionRef = collection(categoryDocRef, 'todos');

    return collectionData(todosCollectionRef, { idField: 'id' }).pipe(
      map((todos: Todo[]) => {
        return todos.map(todo => {
          const todoId = todo.id;  
          return { todoId, ...todo };
        });
      })
    );
  }


  updateTodo(catId: string, todoId: string, updatedData: string): void { 
    const todoDocRef = doc(this.firestore, `categories/${catId}/todos/${todoId}`);
    updateDoc(todoDocRef, { todoText: updatedData }) 
      .then(() => {
        this.toastr.success('Todo Updated Successfully');
      })
      .catch((err: any) => {
        console.log('Error updating todo:', err);
      });
  }

  deleteTodo(catId: string, todoId: string): void {
    const todoDocRef = doc(this.firestore, `categories/${catId}/todos/${todoId}`);
    const categoryDocRef = doc(this.firestore, `categories/${catId}`);
    
    deleteDoc(todoDocRef)
      .then(() => {
        updateDoc(categoryDocRef, { todoCount: increment(-1) })
          .then(() => {
            this.toastr.error('Todo Deleted Successfully');
          })
          .catch((err: any) => {
            console.error('Error decrementing todo count:', err);
          });
      })
      .catch((err: any) => {
        console.error('Error deleting todo:', err);
      });
  }

  markComplete(catId:string, todoId:string){
    const todoDocRef = doc(this.firestore, `categories/${catId}/todos/${todoId}`);
    updateDoc(todoDocRef, { isCompleted: true }) 
      .then(() => {
        this.toastr.info('Todo Marked Completed');
      })
      .catch((err: any) => {
        console.log('Error updating todo:', err);
      });
  }
  
  markUnComplete(catId:string, todoId:string){
    const todoDocRef = doc(this.firestore, `categories/${catId}/todos/${todoId}`);
    updateDoc(todoDocRef, { isCompleted: false }) 
      .then(() => {
        this.toastr.warning('Todo Marked Uncompleted');
      })
      .catch((err: any) => {
        console.log('Error updating todo:', err);
      });
  }
  
}
