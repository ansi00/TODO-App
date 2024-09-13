import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, private toastr: ToastrService) {
    this.categoryCollection = collection(this.firestore, 'categories');
  }

  saveCategory(data: any) {
    addDoc(this.categoryCollection, data)
      .then(() => {
        this.toastr.success('New Category Saved Successfully');
      })
      .catch((err: any) => {
        console.log('Error saving category:', err);
      });
  }

  loadCategories(): Observable<any[]> {
    const categoriesRef = collection(this.firestore, 'categories');
    return collectionData(categoriesRef, { idField: 'id' }).pipe(
      map((actions: unknown[]) => {
        return actions.map((a: any) => {
          const id = a.id;
          const data = a;
          return { id, ...data };
        });
      })
    );
  }

  updateCategory(id: string, updatedData: string): void {
    const categoryDoc = doc(this.firestore, `categories/${id}`);
    updateDoc(categoryDoc, { category: updatedData })
      .then(() => {
        this.toastr.success('Category Updated Successfully');
      })
      .catch((err: any) => {
        console.log('Error updating category:', err);
      });
  }

  deleteCategory(id: string): void {
    const categoryDoc = doc(this.firestore, `categories/${id}`);
    deleteDoc(categoryDoc)
      .then(() => {
        this.toastr.error('Category Deleted Successfully');
      })
      .catch((err: any) => {
        console.error('Error deleting category:', err);
      });
  }
}
