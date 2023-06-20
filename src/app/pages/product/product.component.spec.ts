import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
