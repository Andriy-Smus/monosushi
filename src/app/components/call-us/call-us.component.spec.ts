import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallUsComponent } from './call-us.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('CallUsComponent', () => {
  let component: CallUsComponent;
  let fixture: ComponentFixture<CallUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallUsComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
