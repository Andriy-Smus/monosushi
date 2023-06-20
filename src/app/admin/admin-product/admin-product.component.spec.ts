import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductComponent } from './admin-product.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;
  let fb: FormBuilder;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    formBuilder = new FormBuilder();
    await TestBed.configureTestingModule({
      declarations: [ AdminProductComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isRedCategory to true when category is empty', () => {
    component.productForm = fb.group({
      category: ''
    });
    component.blurCategory();
    expect(component.isRedCategory).toBe(true);
  });

  it('should set isRedCategory to false when category is not empty', () => {
    component.productForm = fb.group({
      category: 'some category'
    });
    component.blurCategory();
    expect(component.isRedCategory).toBe(false);
  });

  it('should set isRedName to true when name is empty', () => {
    component.productForm = fb.group({
      name: ''
    });
    component.blurName();
    expect(component.isRedName).toBe(true);
  });

  it('should set isRedName to false when name is not empty', () => {
    component.productForm = fb.group({
      name: 'some name'
    });
    component.blurName();
    expect(component.isRedName).toBe(false);
  });

  it('should set isRedPath to true when path is empty', () => {
    component.productForm = fb.group({
      path: ''
    });
    component.blurPath();
    expect(component.isRedPath).toBe(true);
  });

  it('should set isRedPath to false when path is not empty', () => {
    component.productForm = fb.group({
      path: 'some/path'
    });
    component.blurPath();
    expect(component.isRedPath).toBe(false);
  });

  it('should set isRedPath to true when ingredients is empty', () => {
    component.productForm = fb.group({
      ingredients: ''
    });
    component.blurIngredients();
    expect(component.isRedIngredients).toBe(true);
  });

  it('should set isRedPath to false when ingredients is not empty', () => {
    component.productForm = fb.group({
      ingredients: 'some ingredients'
    });
    component.blurIngredients();
    expect(component.isRedIngredients).toBe(false);
  });

  it('should set isRedPath to true when weight is empty', () => {
    component.productForm = fb.group({
      weight: ''
    });
    component.blurWeight();
    expect(component.isRedWeight).toBe(true);
  });

  it('should set isRedPath to false when weight is not empty', () => {
    component.productForm = fb.group({
      weight: 'some weight'
    });
    component.blurWeight();
    expect(component.isRedWeight).toBe(false);
  });

  it('should set isRedPrice to true when price is empty', () => {
    component.productForm = fb.group({
      price: ''
    });
    component.blurPrice();
    expect(component.isRedPrice).toBe(true);
  });

  it('should set isRedPrice to false when price is not empty', () => {
    component.productForm = fb.group({
      price: 10
    });
    component.blurPrice();
    expect(component.isRedPrice).toBe(false);
  });

  it('should toggle addStatus when called', () => {
    component.addStatus = false;
    component.openAddProduct();
    expect(component.addStatus).toBe(true);
    component.openAddProduct();
    expect(component.addStatus).toBe(false);
  });

  it('should return value of specified control', () => {
    const testValue = 'Test Value';
    const testControl = 'testControl';
    component.productForm = formBuilder.group({
      [testControl]: [testValue, Validators.required]
    });
    const result = component.valueByControl(testControl);
    expect(result).toEqual(testValue);
  });

});
