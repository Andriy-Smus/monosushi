import { Component, OnInit } from '@angular/core';
import {AccountService, IAddress} from '../../../shared/services/account/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { collection, DocumentData } from '@firebase/firestore'
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  public user!: any;
  public addressForm!: FormGroup;
  public userForm!: FormGroup;
  private userCollection!: CollectionReference<DocumentData>;
  public addresses!: IAddress[];
  public editStatus = false;
  public editingAddressIndex!: number;
  public field!: string;
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private afs: Firestore,
    private toastr: ToastrService
  ) {
    this.userCollection = collection(this.afs, 'users')
  }

  ngOnInit(): void {
    this.loadUser();
    this.initAddressForm();
    this.initUserForm();
  }
  loadUser(): void {
    this.accountService.getOneFirebase().subscribe(data => {
      const currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const matchingUser = data.find((user) => user.email === currentUserEmail.email);
      if (matchingUser) {
        this.user = matchingUser;
        this.addresses = this.user.address;
      }
    })
  }
  initAddressForm(): void {
    this.addressForm = this.fb.group({
      type_address: [null, [Validators.required]],
      street: [null, [Validators.required]],
      number_building: [null, [Validators.required]],
      number_apartment: [null]
    })
  }
  initUserForm(): void {
    this.userForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
    })
  }
  addAddress() {
    if (this.editStatus) {
      this.accountService.updateAddressFirebase(this.addressForm.value, this.user.id, this.editingAddressIndex).then(() => {
        this.loadUser();
        this.toastr.success('Адреса успішно оновлена');
        this.addressForm.reset();
        this.editStatus = false;
        this.editingAddressIndex = -1;
      })
    } else {
      this.accountService.createAddressFirebase(this.addressForm.value, this.user.id).then(() => {
        this.loadUser();
        this.toastr.success('Адреса успішно додана');
        this.addressForm.reset();
      });
    }
  }
  editAddress(address: IAddress, index: number) {
    this.addressForm.patchValue({
      type_address: address.type_address,
      street: address.street,
      number_building: address.number_building,
      number_apartment: address.number_apartment
    });
    this.editStatus = true;
    this.editingAddressIndex = index;
  }
  deleteAddress(index: number) {
    this.accountService.deleteAddressFirebase(this.user.id, index).then(() => {
      this.loadUser();
      this.toastr.success('Адреса успішно видалена!');
    })
  }

  updateUser() {
    if (this.userForm.value.firstName) {
      this.field = 'firstName';
      this.accountService.updateFirstNameFirebase(this.userForm.value.firstName, this.user.id, this.field).then(() => {
        this.loadUser();
        this.toastr.success("Ім'я успішно змінено!");
      })
    }
    if (this.userForm.value.lastName) {
      this.field = 'lastName';
      this.accountService.updateFirstNameFirebase(this.userForm.value.lastName, this.user.id, this.field).then(() => {
        this.loadUser();
        this.toastr.success("Прізвище успішно змінено!");
      })
    }
    if (this.userForm.value.phoneNumber) {
      this.field = 'phoneNumber';
      this.accountService.updateFirstNameFirebase(this.userForm.value.phoneNumber, this.user.id, this.field).then(() => {
        this.loadUser();
        this.toastr.success("Номер телефону успішно змінено!");
      })
    }
    if (this.userForm.value.email && this.userForm.controls.email.valid) {
      this.field = 'email';
      this.accountService.updateFirstNameFirebase(this.userForm.value.email, this.user.id, this.field).then(() => {
        this.loadUser();
        this.toastr.success("Email успішно змінено!");
      })
    }
    if(this.userForm.value.email && !this.userForm.controls.email.valid) {
      this.toastr.error('Email некоректно введено!')
    }
  }
}
