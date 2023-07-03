import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-call-us',
  templateUrl: './call-us.component.html',
  styleUrls: ['./call-us.component.scss']
})
export class CallUsComponent implements OnInit {
  public phoneForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CallUsComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.phoneFormInit();
  }
  phoneFormInit() {
    this.phoneForm = this.fb.group({
      name: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^(\+?\d{1,3}[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/)]]
    })
  }
  sentContat() {
    this.toastr.success('Ви такий молодець!');
    this.dialogRef.close();
  }
  closeModal(): void {
    this.dialogRef.close();
  }

}
