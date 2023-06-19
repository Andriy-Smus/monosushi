import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./footer.component";
import {FooterRoutingModule} from "./footer-routing.module";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    FooterRoutingModule,
    SharedModule
  ]
})
export class FooterModule { }
