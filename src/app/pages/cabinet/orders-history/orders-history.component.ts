import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {
  public ordersHistory!: any;
  public products!: any;
  public noOrders = false

  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.orderService.getMyOrdersFirebase().subscribe(data => {
      const currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const matchingUser = data.filter((user) => user.email === currentUserEmail.email);
      if (currentUserEmail.email) {
        this.ordersHistory = matchingUser;
        if(this.ordersHistory.length === 0) {
          this.noOrders = true
        } else {
          this.noOrders = false
        }
      }
    })
  }

  getTotalPrice(basket: any[]): string {
    let total = 0;

    for (const product of basket) {
      total += product.count * product.price;
    }
    return total + ' грн';
  }
  toCheckout() {
    this.router.navigate(['/checkout']);
  }
}
