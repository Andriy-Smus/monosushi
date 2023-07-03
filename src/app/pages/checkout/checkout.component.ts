import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AccountService } from '../../shared/services/account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public basket: Array<IProductResponse> = [];
  public basketIsActive = false;
  public total = 0;
  public count = 0;

  public numberOptions: string[] = ['Навчальні тримачі', '0', '1'];
  public isCount = false;
  public isNumber = false;
  public isTime = false;
  public isAddress = false;

  public isRedName = false;
  public isRedPhone = false;
  public isRedStreet = false;
  public isRedHouse = false;
  public isRedTime = true;
  public isRedAddress = true;

  public isName = true;
  public isPhone = true;
  public isHouse = true;
  public isStreet = true;

  public orderForm!: FormGroup;

  public addComment = false;
  public addCommentForKitchen = false;
  public addTime = false;
  public addDelivery = true;
  public addSelfPickup = false;

  @ViewChild('selectedValue') selectedValue!: ElementRef;
  @ViewChild('selectedCount') selectedCount!: ElementRef;
  @ViewChild('selectedTime') selectedTime!: ElementRef;
  @ViewChild('selectedAddress') selectedAddress!: ElementRef;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService
  ) { }

  inputName(): void {
    if(!this.orderForm.value.name) {
      this.isRedName = true;
      this.isName = true;
    } else {
      this.isRedName = false
      this.isName = false;
    }
  }
  inputPhone(): void {
    if(!this.orderForm.value.phone) {
      this.isRedPhone = true;
      this.isPhone = true;
    } else {
      this.isRedPhone = false;
      this.isPhone = false;
    }
  }
  inputStreet(): void {
    if(!this.orderForm.value.street) {
      this.isRedStreet = true;
      this.isStreet = true;
    } else {
      this.isRedStreet = false;
      this.isStreet = false;
    }
  }
  inputHouse(): void {
    if(!this.orderForm.value.house) {
      this.isRedHouse = true;
      this.isHouse = true;
    } else {
      this.isRedHouse = false;
      this.isHouse = false;
    }
  }

  openComment():void {
    this.addComment = !this.addComment;
  }
  openCommentForKitchen():void {
    this.addCommentForKitchen = !this.addCommentForKitchen;
  }
  openInputTime():void {
    this.addTime = !this.addTime;
  }
  openAddDelivery(): void {
    this.addDelivery = true;
    this.addSelfPickup = false;
  }
  openSelfPickup(): void {
    this.addDelivery = false;
    this.addSelfPickup = true;
  }

  ngOnInit(): void {
    this.initOrderForm(),
    this.loadBasket(),
    this.updateBasket()
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      number_devices: ['1'],
      payment_method: ['Оплата готівкою'],
      delivery_method: ['Доставка курєром'],
      at_time: [null],
      name: [null, Validators.required],
      phone: [null, Validators.required],
      date: [null],
      time: [null],
      pickup_address: [null],
      street: [null],
      house: [null],
      entrance: [null],
      flat: [null],
      no_call: [null],
      comment: [null],
      comment_kitchen: [null]
    });
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

  closeBasket(): void {
    this.basketIsActive = false;
  }

  openCount():void {
    this.isCount = !this.isCount;
    this.isNumber = false;
  }
  openNumber():void {
    this.isNumber = !this.isNumber;
    this.isCount = false;
  }
  openTime():void {
    this.isTime = !this.isTime;
  }
  openAddress():void {
    this.isAddress = !this.isAddress;
  }

  changeValue(optionValue: string):void {
    this.selectedValue.nativeElement.textContent = optionValue;
    this.generateNumberOptions(parseInt(optionValue, 10));
    this.orderForm.get('number_devices')?.setValue(optionValue);
  }
  changeCount(optionValue: string):void {
    this.selectedCount.nativeElement.textContent = optionValue;
  }
  generateNumberOptions(count: number): void {
    this.numberOptions = ['Навчальні тримачі', '0'];
    for (let i = 1; i <= count; i++) {
      this.numberOptions.push(i.toString());
    }
  }
  changeTime(optionValue: string):void {
    this.selectedTime.nativeElement.textContent = optionValue;
    this.orderForm.get('time')?.setValue(optionValue);
    this.isRedTime = false
  }
  changeAddress(optionValue: string):void {
    this.selectedAddress.nativeElement.textContent = optionValue;
    this.orderForm.get('pickup_address')?.setValue(optionValue);
    this.isRedAddress = false
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
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

  addOrder(): void {
    function generateOrderNumber() {
      let timestamp = Date.now().toString(); // Отримання поточного часу в мілісекундах та перетворення його в рядок
      let orderNumber = timestamp.substr(-10); // Використовуємо останні 10 символів з рядка поточного часу
      return orderNumber;
    }
    function getCurrentDateTime() {
      let currentDate = new Date();
      let dateTimeString = currentDate.toLocaleString(); // Отримання рядкового представлення поточної дати та часу
      return dateTimeString;
    }
    function getEmailUser() {
      let currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || '{}');
      let matchingUser = currentUserEmail.email;
      console.log(matchingUser)
      if (matchingUser) {
        return matchingUser;
      } else {
        return 'не авторизований'
      }
    }
    const data = {
      basket: this.basket,
      orderForm: this.orderForm.value,
      numberOrder: generateOrderNumber(),
      dateTime: getCurrentDateTime(),
      email: getEmailUser()
    };
    this.orderService.createFirebase(data).then(() => {
    })
    this.orderForm.reset();
    this.toastr.success('Замовлення успішно створено!');
    this.orderForm = this.fb.group({
      number_devices: ['1'],
      payment_method: ['Оплата готівкою'],
      delivery_method: ['Доставка курєром'],
      at_time: [null],
      name: [null, Validators.required],
      phone: [null, Validators.required],
      date: [null],
      time: [null],
      pickup_address: [null],
      street: [null],
      house: [null],
      entrance: [null],
      flat: [null],
      no_call: [null],
      comment: [null],
      comment_kitchen: [null]
    });
    this.isName = true;
    this.isPhone = true;
    this.isHouse = true;
    this.isStreet = true;
  }
}
