import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CabinetComponent } from './cabinet.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { PasswordChangeComponent } from './password-change/password-change.component';



@NgModule({
  declarations: [
    CabinetComponent,
    PersonalDataComponent,
    OrdersHistoryComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule
  ]
})
export class CabinetModule { }
