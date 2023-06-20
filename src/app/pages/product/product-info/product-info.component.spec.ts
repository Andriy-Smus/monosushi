import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInfoComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoComponent);
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
