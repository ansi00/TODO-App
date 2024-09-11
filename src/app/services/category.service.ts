import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, private toastr : ToastrService) {
   
    this.categoryCollection = collection(this.firestore, 'categories');
  }

  saveCategory(data: any ) {
    
    addDoc(this.categoryCollection, data)
      .then(() => {
        this.toastr.success('New Category Saved Successfully')
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
