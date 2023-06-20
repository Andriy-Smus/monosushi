import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should toggle basketIsActive property', () => {
    expect(component.basketIsActive).toBeFalse();

    component.basketActive();
    expect(component.basketIsActive).toBeTrue();

    component.basketActive();
    expect(component.basketIsActive).toBeFalse();
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

  it('should set basketIsActive to false', () => {
    component.basketIsActive = true;
    component.closeBasket();
    expect(component.basketIsActive).toBe(false);
  });

  it('should set isLogin to true and set loginUrl and loginPage for ADMIN role', () => {
    const currentUser = { role: 'ADMIN' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));
    component.checkUserLogin();
    expect(component.isLogin).toBe(true);
    expect(component.loginUrl).toBe('admin/discount');
    expect(component.loginPage).toBe('Admin');
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
