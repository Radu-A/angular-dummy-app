import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-view',
  imports: [CardModule, FloatLabel, InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './login-view.html',
  styleUrl: './login-view.css',
})
export class LoginView {
  service = inject(AuthService);
  // Reactive Form instead signal form
  // Maybe in future app's
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    console.log('Login in login view');

    if (this.loginForm.value) {
      const { username, password } = this.loginForm.value;
      this.service.login(username!, password!);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
