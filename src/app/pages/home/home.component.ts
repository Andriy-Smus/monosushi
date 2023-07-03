import { Component, OnInit } from '@angular/core';
import {IDiscountResponse} from "../../shared/interfaces/discount/discount.interface";
import {DiscountService} from "../../shared/services/discount/discount.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userDiscounts: Array<IDiscountResponse> = [];
  constructor(
    private discountService: DiscountService
  ) { }

  ngOnInit(): void {
    this.getDiscounts();
  }

  getDiscounts(): void {
    this.discountService.getAllFirebase().subscribe(data => {
      this.userDiscounts = data as IDiscountResponse[];
    })
  }

}
