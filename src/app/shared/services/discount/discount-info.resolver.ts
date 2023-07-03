import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DiscountService } from './discount.service';
import { DocumentData } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class DiscountInfoResolver implements Resolve<DocumentData> {

  constructor(private discountService: DiscountService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentData>{
    return this.discountService.getOneFirebase(route.paramMap.get('id') as string);
  }

}














//resolve(discount: IDiscountResponse) {
//     return this.discountService.getOneFirebase(discount.id as string).subscribe(data =>{
//     this.userDiscounts = data as IDiscountResponse[];
//     console.log(this.userDiscounts[0].title);
//     })
//   }
