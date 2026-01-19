import { inject, Injectable, signal, computed } from '@angular/core';

import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { ServiceResponseModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser = signal<UserModel | undefined>(undefined);
  currentUser = this._currentUser.asReadonly();
  isLoggedIn = computed(() => !!this.currentUser()); // ??!!!

  async login(username: string, password: string): Promise<ServiceResponseModel> {
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
        // credentials: 'include',
      });
      const data: AuthModel = await response.json();
      const accessToken = data.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        this._currentUser.set({
          id: data.id,
          username: data.username,
          email: data.email,
        });
        const response: ServiceResponseModel = {
          success: true,
          message: 'User logged',
          data: data,
        };
        console.error(response.message);

        return response;
      } else {
        const response: ServiceResponseModel = {
          success: false,
          message: 'Wrong username or password',
        };
        console.error(response.message);

        return response;
      }
    } catch (error) {
      const response: ServiceResponseModel = {
        success: false,
        message: `Something went wrong in service: ${error}`,
      };
      console.error(response.message);
      return response;
    }
  }
}
