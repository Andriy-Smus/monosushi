import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {AccountService} from "../shared/services/account/account.service";
import {Router} from "@angular/router";

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let router: Router;
  let accountService: AccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AccountService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    accountService = TestBed.inject(AccountService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page, remove current user from localStorage, and notify account service', () => {
    spyOn(router, 'navigate');
    spyOn(localStorage, 'removeItem');
    spyOn(accountService.isUserLogin$, 'next');

    component.logout();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser');
    expect(accountService.isUserLogin$.next).toHaveBeenCalledWith(true);
  });
});
