import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { getAuth, updatePassword } from 'firebase/auth';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  public user!: any;
  public changePasswordForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.changePasswordFormInit();
    this.loadUser()
  }

  changePasswordFormInit() {
    this.changePasswordForm = this.fb.group({
      old_password: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password2: [null, [Validators.required]],
    })
  }
  loadUser(): void {
    this.accountService.getOneFirebase().subscribe(data => {
      const currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const matchingUser = data.find((user) => user.email === currentUserEmail.email);
      if (matchingUser) {
        this.user = matchingUser;
      }
    });
  }

  changePassword(): void {
    const newPassword = this.changePasswordForm.get('password')?.value;
    const confirmPassword = this.changePasswordForm.get('password2')?.value;
    // Перевірити співпадання нового пароля із підтвердженням
    if (newPassword !== confirmPassword) {
      this.toastr.info('Новий пароль не співпадає з підтвердженням пароля');
      return;
    }
    this.login(this.user.email, newPassword).then(() => {
      const auth = getAuth();
      const user = auth.currentUser;
      updatePassword(user as any, newPassword).then(() => {
        this.toastr.success('Пароль успішно змінено');
      })
    }).catch(e => {
      this.toastr.info('Невірно введений поточний пароль');
    })
  }

  async login(email: string, password: string): Promise<void> {
    const oldPassword = this.changePasswordForm.get('old_password')?.value;
    const credential = await signInWithEmailAndPassword(this.auth, this.user.email, oldPassword);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
    }, (e) => {
      console.log('error', e);
    })
  }
}

