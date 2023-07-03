import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {addDoc, collectionData, CollectionReference, Firestore} from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public changeBasket = new Subject<boolean>();

  private orderCollection!: CollectionReference<DocumentData>;
  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.orderCollection = collection(this.afs, 'orders')
  }

  createFirebase(data: any) {
    return addDoc(this.orderCollection, data);
  }

  getMyOrdersFirebase() {
    return collectionData(this.orderCollection, { idField: 'id' })
  }
}
