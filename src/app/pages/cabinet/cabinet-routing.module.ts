import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import {AdminCategoryComponent} from "../../admin/admin-category/admin-category.component";
import {AdminProductComponent} from "../../admin/admin-product/admin-product.component";
import {AdminDiscountComponent} from "../../admin/admin-discount/admin-discount.component";
import {PersonalDataComponent} from "./personal-data/personal-data.component";
import {OrdersHistoryComponent} from "./orders-history/orders-history.component";
import {PasswordChangeComponent} from "./password-change/password-change.component";





const routes: Routes = [
  {
    path: '', component: CabinetComponent, children: [
      { path: 'personal', component: PersonalDataComponent },
      { path: 'history', component: OrdersHistoryComponent },
      { path: 'password', component: PasswordChangeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'personal' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
