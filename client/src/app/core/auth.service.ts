import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { environment } from '../../environments/environment.development';
import { LocalStorageService } from '../shared/services/local-storage.service';

type LoginResponseType = {
  accessToken: string;
  user: User;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

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
