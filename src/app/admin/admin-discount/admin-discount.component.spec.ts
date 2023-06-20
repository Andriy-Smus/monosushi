import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountComponent } from './admin-discount.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;
  let formBuilder: FormBuilder;


  beforeEach(async () => {
    formBuilder = new FormBuilder();
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscountComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isRedName to true if name is empty', () => {
    component.discountForm = formBuilder.group({
      name: '',
    });
    component.blurName();
    expect(component.isRedName).toBe(true);
  });

  it('should set isRedName to false if name is not empty', () => {
    component.discountForm = formBuilder.group({
      name: 'Discount Name',
    });
    component.blurName();
    expect(component.isRedName).toBe(false);
  });

  it('should set isRedTitle to true if title is not present', () => {
    component.discountForm = formBuilder.group({
      title: '',
    });
    component.blurTitle();
    expect(component.isRedTitle).toBeTrue();
  });

  it('should set isRedTitle to false if title is present', () => {
    component.discountForm = formBuilder.group({
      title: 'Discount Title',
    });
    component.blurTitle();
    expect(component.isRedTitle).toBeFalse();
  });

  it('should set isRedDescription to true if description is not present', () => {
    component.discountForm = formBuilder.group({
      description: '',
    });
    component.blurDescription();
    expect(component.isRedDescription).toBeTrue();
  });

  it('should set isRedDescription to false if description is present', () => {
    component.discountForm = formBuilder.group({
      description: 'Discount Description',
    });
    component.blurDescription();
    expect(component.isRedDescription).toBeFalse();
  });

  it('should toggle addStatus property', () => {
    expect(component.addStatus).toBeFalse();
    component.openAddDiscount();
    expect(component.addStatus).toBeTrue();
    component.openAddDiscount();
    expect(component.addStatus).toBeFalse();
  });

  it('should return value of specified control', () => {
    const testValue = 'Test Value';
    const testControl = 'testControl';
    component.discountForm = formBuilder.group({
      [testControl]: [testValue, Validators.required]
    });
    const result = component.valueByControl(testControl);
    expect(result).toEqual(testValue);
  });
});
