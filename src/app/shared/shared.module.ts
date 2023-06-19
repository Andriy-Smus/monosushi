import { NgModule } from "@angular/core";

import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

const MATERIAL = [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
]

// other

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
    ],
    exports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
    ]
})
export class SharedModule {}
