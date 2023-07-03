import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProductRequest } from '../../interfaces/product/product.interface';
import {
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';
import { collection, DocumentData, query, where } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };
  private productCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.productCollection = collection(this.afs, 'products')
  }

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' })
  }
  getSomeFirebase() {
    const queryOptions = query(this.productCollection, where('category.name', 'in', ['Сети', 'Роли']));
    return collectionData(queryOptions, { idField: 'id' });
  }

  getAllByCategory(name: string = '') {
    const queryOptions = query(this.productCollection, where('category.path', '==', name));
    return collectionData(queryOptions, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const discountDocumentReference = doc(this.afs, `products/${id}`);
    return docData(discountDocumentReference, { idField: 'id' });
  }

  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateFirebase(product: IProductRequest, id: string) {
    const  discountDocumentReference = doc(this.afs, `products/${id}`)
    return updateDoc(discountDocumentReference,{...product});
  }

  deleteFirebase(id: string) {
    const  discountDocumentReference = doc(this.afs, `products/${id}`)
    return deleteDoc(discountDocumentReference);
  }
}
