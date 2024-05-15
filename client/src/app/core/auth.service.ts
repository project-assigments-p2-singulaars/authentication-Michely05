import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { environment } from '../../environments/environment.development';

type LoginResponseType = {
  accessToken: string;
  user: User;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;
  private http = inject();
  http = inject(HttpClient);

  async login(credentials: User) {
    // return this.http.post<User>(`${this.url}/login`, user).pipe(
    //   tap((response: any) => {
    //     // console.log(response.body);
    //     localStorage.setItem('id', response.body.user.id);
    //   }),
    //   catchError((e) => of(e))
    // );
    try {
      const result: any = await firstValueFrom(
        this.http.post<LoginResponseType>(
          this.url.concat('/login'),
          credentials
        )
      );
      const { user } = result;
      localStorage.setItem('user', JSON.stringify(user));

      return result;
    } catch (e) {
      throw e;
    }
  }
}
