import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  collectionData,
  CollectionReference,
  doc,
  Firestore,
  updateDoc,
  DocumentReference,
  getDoc
} from '@angular/fire/firestore';
import { collection, DocumentData, arrayUnion } from '@firebase/firestore';


export interface IAddress {
  type_address: string;
  street: string;
  number_building: string;
  number_apartment: string;
}
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isUserLogin$ = new Subject<boolean>();
  private url = environment.BACKEND_URL;
  private api = { auth: `${this.url}/auth` };

  private userCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore,
  ) {
    this.userCollection = collection(this.afs, 'users')
  }

  getOneFirebase() {
    return collectionData(this.userCollection, { idField: 'id' })
  }

  createAddressFirebase(address: IAddress, id: string) {
    const addressDocumentReference = doc(this.afs, `users/${id}`);
    return updateDoc(addressDocumentReference, {address: arrayUnion(address)})
  }

  updateAddressFirebase(address: IAddress, id: string, addressIndex: number) {
    const userDocumentReference: DocumentReference<DocumentData> = doc(this.afs, `users/${id}`);
    // Отримати поточний масив address з документа
    return getDoc(userDocumentReference)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const currentAddresses = userData.address || [];
          // Змінити певний об'єкт масиву за індексом addressIndex
          currentAddresses[addressIndex] = address;
          // Оновити документ з оновленим масивом address
          return updateDoc(userDocumentReference, { address: currentAddresses });
        } else {
          throw new Error(`Document with id ${id} does not exist.`);
        }
      })
      .catch((error: any) => {
        console.error('Error updating address:', error);
        throw error;
      });
  }

  deleteAddressFirebase(id: string, addressIndex: number) {
    const userDocumentReference: DocumentReference<DocumentData> = doc(this.afs, `users/${id}`);
    // Отримати поточний масив address з документа
    return getDoc(userDocumentReference)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const currentAddresses = userData.address || [];
          // Видалити об'єкт масиву за індексом addressIndex
          currentAddresses.splice(addressIndex, 1);
          // Оновити документ з оновленим масивом address
          return updateDoc(userDocumentReference, { address: currentAddresses });
        } else {
          throw new Error(`Document with id ${id} does not exist.`);
        }
      })
      .catch((error) => {
        console.error('Error deleting address:', error);
        throw error;
      });
  }
  updateFirstNameFirebase(value: string, id: string, field: string) {
    const addressDocumentReference = doc(this.afs, `users/${id}`);
    return updateDoc(addressDocumentReference, {[field]: value})
  }

}
