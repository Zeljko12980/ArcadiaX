import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalService } from '../../service/modal-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.html',
  styleUrls: ['./auth-modal.css'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class AuthModal {
 /** tab kontrola */
  activeTab: 'login' | 'register' = 'login';

  /** reaktivne forme */
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public modalService: ModalService
  ) {}

  /* registracija modala u servisu */
  ngOnInit() {
    this.modalService.register('auth-modal');

    /** definicija login forme */
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    /** definicija register forme */
    this.registerForm = this.fb.group({
      name:     ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      age:      ['', [Validators.required, Validators.min(13)]],
      phone:    ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm:  ['', Validators.required],
    }, { validator: this.matchPasswords });
  }

  /** custom validator: password === confirm */
  matchPasswords(group: FormGroup) {
    const pass  = group.get('password')?.value;
    const conf  = group.get('confirm') ?.value;
    return pass === conf ? null : { mismatch: true };
  }

  /** submit login */
  submitLogin() {
    if (this.loginForm.invalid) return;
    console.log('LOGIN', this.loginForm.value);
    // TODO: AuthService.login(...)
    this.close();
  }

  /** submit register */
  submitRegister() {
    if (this.registerForm.invalid) return;
    console.log('REGISTER', this.registerForm.value);
    // TODO: AuthService.register(...)
    this.close();
  }

  selectTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }

  close() {
    this.modalService.toggleModal('auth-modal');
  }

  ngOnDestroy() {
    this.modalService.unregister('auth-modal');
  }

}
