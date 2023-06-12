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

@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL
    ],
    exports: [
        ...MATERIAL
    ]
})
export class SharedModule {}