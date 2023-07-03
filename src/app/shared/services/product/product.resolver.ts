import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { DocumentData} from "@firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<DocumentData> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentData> {
    return this.productService.getOneFirebase(route.paramMap.get('id') as string);
  }
}
