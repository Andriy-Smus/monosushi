import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle input name', () => {
    const nameControl = component.orderForm.controls['name'];

    nameControl.setValue('');
    component.inputName();
    expect(component.isRedName).toBeTrue();
    expect(component.isName).toBeTrue();

    nameControl.setValue('John Doe');
    component.inputName();
    expect(component.isRedName).toBeFalse();
    expect(component.isName).toBeFalse();
  });

  it('should handle input phone', () => {
    const phoneControl = component.orderForm.controls['phone'];

    phoneControl.setValue('');
    component.inputPhone();
    expect(component.isRedPhone).toBeTrue();
    expect(component.isPhone).toBeTrue();

    phoneControl.setValue('1234567890');
    component.inputPhone();
    expect(component.isRedPhone).toBeFalse();
    expect(component.isPhone).toBeFalse();
  });

  it('should handle input street', () => {
    const streetControl = component.orderForm.controls['street'];

    streetControl.setValue('');
    component.inputStreet();
    expect(component.isRedStreet).toBeTrue();
    expect(component.isStreet).toBeTrue();

    streetControl.setValue('Main Street');
    component.inputStreet();
    expect(component.isRedStreet).toBeFalse();
    expect(component.isStreet).toBeFalse();
  });

  it('should handle input house', () => {
    const houseControl = component.orderForm.controls['house'];

    houseControl.setValue('');
    component.inputHouse();
    expect(component.isRedHouse).toBeTrue();
    expect(component.isHouse).toBeTrue();

    houseControl.setValue('123');
    component.inputHouse();
    expect(component.isRedHouse).toBeFalse();
    expect(component.isHouse).toBeFalse();
  });

  it('should toggle addComment', () => {
    component.addComment = false;
    component.openComment();
    expect(component.addComment).toBeTrue();
    component.openComment();
    expect(component.addComment).toBeFalse();
  });

  it('should toggle addCommentForKitchen', () => {
    component.addCommentForKitchen = false;
    component.openCommentForKitchen();
    expect(component.addCommentForKitchen).toBeTrue();
    component.openCommentForKitchen();
    expect(component.addCommentForKitchen).toBeFalse();
  });

  it('should toggle addTime', () => {
    component.addTime = false;
    component.openInputTime();
    expect(component.addTime).toBeTrue();
    component.openInputTime();
    expect(component.addTime).toBeFalse();
  });

  it('should set addDelivery to true and addSelfPickup to false', () => {
    component.addDelivery = false;
    component.addSelfPickup = true;
    component.openAddDelivery();
    expect(component.addDelivery).toBeTrue();
    expect(component.addSelfPickup).toBeFalse();
  });

  it('should set addDelivery to false and addSelfPickup to true', () => {
    component.addDelivery = true;
    component.addSelfPickup = false;
    component.openSelfPickup();
    expect(component.addDelivery).toBeFalse();
    expect(component.addSelfPickup).toBeTrue();
  });

  it('should load basket and calculate total price', () => {
    const mockBasket  = [
      { id: 1,
        category: {
          id: 1,
          name: 'string',
          path: 'string',
          imagePath: 'string',
        },
        path: 'string',
        ingredients: 'string',
        weight: 'string',
        price: 10,
        imagePath: 'string',
        count: 2,
        name: 'Product 1',
      },
      { id: 2,
        category: {
          id: 2,
          name: 'string',
          path: 'string',
          imagePath: 'string',
        },
        path: 'string',
        ingredients: 'string',
        weight: 'string',
        price: 15,
        imagePath: 'string',
        count: 3,
        name: 'Product 2',
      }
    ];
    component.basket = mockBasket;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(65);
  });

  it('should calculate total count', () => {
    const mockBasket = [
      { id: 1,
        category: {
          id: 1,
          name: 'string',
          path: 'string',
          imagePath: 'string',
        },
        path: 'string',
        ingredients: 'string',
        weight: 'string',
        price: 10,
        imagePath: 'string',
        count: 2,
        name: 'Product 1',
      },
      { id: 2,
        category: {
          id: 2,
          name: 'string',
          path: 'string',
          imagePath: 'string',
        },
        path: 'string',
        ingredients: 'string',
        weight: 'string',
        price: 15,
        imagePath: 'string',
        count: 3,
        name: 'Product 2',
      }
    ];
    component.basket = mockBasket;
    spyOn(component, 'getTotalCount').and.callThrough();
    component.getTotalCount();
    expect(component.getTotalCount).toHaveBeenCalled();
    expect(component.count).toBe(5);
  });

  it('should increment product count', () => {
    const productFake = [
      { id: 1,
        category: {
          id: 1,
          name: 'string',
          path: 'string',
          imagePath: 'string',
        },
        path: 'string',
        ingredients: 'string',
        weight: 'string',
        price: 10,
        imagePath: 'string',
        count: 2,
        name: 'Product 1',
      }
    ]
    component.productCount(productFake[0], true);
    expect(productFake[0].count).toBe(3);
    component.productCount(productFake[0], false);
    expect(productFake[0].count).toBe(2);
  });

  it('should close the basket by setting basketIsActive to false', () => {
    component.basketIsActive = true;
    component.closeBasket();
    expect(component.basketIsActive).toBeFalse();
  });

  it('should open the count mode and set isCount to true and isNumber to false', () => {
    component.isCount = false;
    component.isNumber = true;
    component.openCount();
    expect(component.isCount).toBeTrue();
    expect(component.isNumber).toBeFalse();
  });

  it('should open the number mode and set isNumber to true and isCount to false', () => {
    component.isNumber = false;
    component.isCount = true;
    component.openNumber();
    expect(component.isNumber).toBeTrue();
    expect(component.isCount).toBeFalse();
  });

  it('should open the time mode and set isTime to true', () => {
    component.isTime = false;
    component.openTime();
    expect(component.isTime).toBeTrue();
  });

  it('should open the address mode and set isAddress to true', () => {
    component.isAddress = false;
    component.openAddress();
    expect(component.isAddress).toBeTrue();
  });

  it('should generate number options', () => {
    const count = 5;
    const expectedOptions = ['Навчальні тримачі', '0', '1', '2', '3', '4', '5'];
    component.generateNumberOptions(count);
    expect(component.numberOptions).toEqual(expectedOptions);
  });

  it('should delete product from basket', () => {
    const product = {
      id: 1,
      category: {
        id: 1,
        name: 'string',
        path: 'string',
        imagePath: 'string',
      },
      path: 'string',
      ingredients: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 2,
      name: 'Product 1',
    };
    const basket = [
      { id: 1,
        category: {
          id: 1,
          name: 'string',
          path: 'string',
          imagePath: 'string',
        },
        path: 'string',
        ingredients: 'string',
        weight: 'string',
        price: 10,
        imagePath: 'string',
        count: 2,
        name: 'Product 1',
      },
      { id: 2,
        category: {
          id: 1,
          name: 'string',
          path: 'string',
          imagePath: 'string',
        },
        path: 'string',
        ingredients: 'string',
        weight: 'string',
        price: 10,
        imagePath: 'string',
        count: 2,
        name: 'Product 1',
      },
    ];
    localStorage.setItem('basket', JSON.stringify(basket));

    component.deleteProduct(product);

    const updatedBasket = JSON.parse(localStorage.getItem('basket') as string);
    expect(updatedBasket.length).toEqual(1); // Basket should have 1 less item
    expect(updatedBasket.some((prod: any) => prod.id === product.id)).toBeFalsy(); // Product should be deleted from basket
  });

});
