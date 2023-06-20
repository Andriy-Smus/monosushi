import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogComponent } from './auth-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthDialogComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isLogin property', () => {
    expect(component.isLogin).toBeFalse();
    component.changeIsLogin();
    expect(component.isLogin).toBeTrue();
    component.changeIsLogin();
    expect(component.isLogin).toBeFalse();
  });

  it('should set matchError if password confirmation does not match', () => {
    const passwordValue = 'password1';
    const confirmedValue = 'password2';

    // Set the values of password and confirmedPassword
    component.registerForm.controls['password'].setValue(passwordValue);
    component.registerForm.controls['confirmedPassword'].setValue(confirmedValue);

    // Call the checkConfirmedPassword method
    component.checkConfirmedPassword();

    // Check if matchError is set for confirmedPassword control
    const errors = component.registerForm.controls['confirmedPassword'].errors;
    expect(errors?.matchError).toEqual('Password confirmation does not match');
  });


  it('should return the password control', () => {
    const passwordControl = component.password;
    expect(passwordControl).toBe(component.registerForm.controls['password']);
  });

  it('should return the confirmed password control', () => {
    const confirmedControl = component.confirmed;
    expect(confirmedControl).toBe(component.registerForm.controls['confirmedPassword']);
  });

  it('should return the visibility of the error', () => {
    const controlName = 'email';
    const errorName = 'required';

    // Set up the form control with the error
    component.registerForm.controls[controlName].setErrors({ [errorName]: true });

    // Check the visibility of the error
    const visibility = component.checkVisibilityError(controlName, errorName);
    expect(visibility).toBe(true);
  });

});
