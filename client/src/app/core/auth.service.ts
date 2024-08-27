import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { environment } from '../../environments/environment.development';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Router } from '@angular/router';

type LoginResponseType = {
  accessToken: string;
  user: User;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000';
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  register(formGroup: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, formGroup);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  async login(credentials: User) {
    try {
      const result = await firstValueFrom(
        this.http.post<LoginResponseType>(
          this.url.concat('/login'),
          credentials
        )
      );

      const { user } = result;
      this.localStorageService.setItem('user', JSON.stringify(user));
    } catch (e) {
      throw e;
    }
  }
}
