import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductResolver } from '../../shared/services/product/product.resolver';

const routes: Routes = [
  {
    path: '', component: ProductComponent
  },
  {
    path: ':id', component: ProductInfoComponent, resolve: {
      productInfo: ProductResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
