import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/services/order/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {
  public ordersHistory!: any;
  public products!: any;
  public noOrders = false
  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders(): void {
    this.orderService.getMyOrdersFirebase().subscribe(data => {
      this.ordersHistory = data;
    })
  }

  getTotalPrice(basket: any[]): string {
    let total = 0;

    for (const product of basket) {
      total += product.count * product.price;
    }
    return total + ' грн';
  }
}
