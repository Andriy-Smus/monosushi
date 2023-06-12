import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isActive = false;
  public basketIsActive = false;
  public total = 0;
  public basket: Array<IProductResponse> = [];
  public count = 0;

  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';

  activeList() {
    this.isActive = !this.isActive;
  }

  isScrolled = false;

  constructor(
    private elementRef: ElementRef, 
    private renderer: Renderer2,
    private orderService: OrderService,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0; // Перевіряємо, чи сторінка прокручена вгору
    this.toggleShadowClass(); // Викликаємо метод для зміни класу з тінню
  }

  toggleShadowClass() {
    if (this.isScrolled) {
      this.renderer.addClass(this.elementRef.nativeElement, 'with-shadow'); // Додаємо клас з тінню
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'with-shadow'); // Видаляємо клас з тінню
    }
  }

  ngOnInit(): void {
    this.loadBasket(),
    this.updateBasket(),
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }
  getTotalCount(): void {
    this.count = this.basket
      .reduce((count: number, prod: IProductResponse) => count + prod.count, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  basketActive(): void {
    this.basketIsActive = !this.basketIsActive;
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    // product.count = 1;
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count = product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
    product.count = 1;
  }

  closeBasket(): void { 
    this.basketIsActive = false;
  }

  deleteProduct(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket.splice(index, 1); // Видаляємо елемент з масиву `basket`
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(currentUser && currentUser.role === ROLE.ADMIN){
      this.isLogin = true;
      this.loginUrl = 'admin/discount';
      this.loginPage = 'Admin';
    } else if(currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog'
    })
  }

}
