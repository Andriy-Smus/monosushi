import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    formBuilder = new FormBuilder();
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoryComponent ],
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
    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isRedName to true if name field is empty', () => {
    component.categoryForm = formBuilder.group({
      name: ['', Validators.required]
    });
    component.blurName();
    expect(component.isRedName).toBeTrue();
  });

  it('should set isRedName to false if name field is not empty', () => {
    const testName = 'Test Name';
    component.categoryForm = formBuilder.group({
      name: [testName, Validators.required]
    });
    component.blurName();
    expect(component.isRedName).toBeFalse();
  });

  it('should set isRedPath to true if path is empty', () => {
    const testPath = 'Test Path';
    component.categoryForm = formBuilder.group({
      path: [testPath, Validators.required]
    });
    component.blurPath();
    expect(component.isRedPath).toBeFalse();
  });

  it('should set isRedPath to false if path is not empty', () => {
    const testPath = '';
    component.categoryForm = formBuilder.group({
      path: [testPath, Validators.required]
    });
    component.blurPath();
    expect(component.isRedPath).toBeTrue();
  });

  it('should toggle addStatus when called', () => {
    component.addStatus = false;
    component.openAddCategory();
    expect(component.addStatus).toBeTrue();
    component.openAddCategory();
    expect(component.addStatus).toBeFalse();
  });

  it('should return value of specified control', () => {
    const testValue = 'Test Value';
    const testControl = 'testControl';
    component.categoryForm = formBuilder.group({
      [testControl]: [testValue, Validators.required]
    });
    const result = component.valueByControl(testControl);
    expect(result).toEqual(testValue);
  });
});
