import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private _currentUser = signal<UserModel | undefined>(undefined);
  currentUser = this._currentUser.asReadonly();
  isLoggedIn = !!this.currentUser();

  async login(username: string, password: string) {
    console.log('login() in auth service');

    try {
      // Fetch to DummyJSON API
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        }),
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      this.router.navigate(['']);
    } catch (error) {
      console.error('Somethitng went wrong in server.');
    }
  }
}
