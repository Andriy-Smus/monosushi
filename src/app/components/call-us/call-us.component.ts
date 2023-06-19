import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-call-us',
  templateUrl: './call-us.component.html',
  styleUrls: ['./call-us.component.scss']
})
export class CallUsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CallUsComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
