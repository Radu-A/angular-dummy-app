import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../services/auth.service';
import { ServiceResponseModel } from '../../models/auth.model';

@Component({
  selector: 'app-login-view',
  imports: [CardModule, FloatLabel, InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './login-view.html',
  styleUrl: './login-view.css',
})
export class LoginView {
  service = inject(AuthService);
  router = inject(Router);
  // Reactive Form instead signal form
  // Maybe in future app's
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  errorMessage = signal<string | null>(null);

  // get username() {
  //   return this.loginForm.get('username');
  // }

  // get password() {
  //   return this.loginForm.get('password');
  // }

  async login() {
    console.log('Login in login view');

    if (this.loginForm.invalid) return;

    if (this.loginForm.value) {
      const { username, password } = this.loginForm.value;
      try {
        const response: ServiceResponseModel = await this.service.login(username!, password!);
        if (response.success) {
          this.router.navigate(['']);
          console.log(response.message);
        } else {
          let loginMessageSection = document.getElementById('login-message-section');
          loginMessageSection?.classList.remove('hidden');
          console.log(loginMessageSection);

          console.log(`Login view response: ${response.message}`);
        }
      } catch (error) {
        console.log(error);
        console.log(`Login view response: ${error}`);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
