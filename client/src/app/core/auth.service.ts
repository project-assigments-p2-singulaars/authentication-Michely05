import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {catchError, firstValueFrom, of} from "rxjs";
import { User } from '../shared/models/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.API_URL;
  http = inject(HttpClient)

async login(credentials:User){
    try{
      const result:any = await firstValueFrom(this.http.post<User>("http://localhost:3000/login", credentials))

      const {user} = result;
      localStorage.setItem('user',JSON.stringify(user))

    }catch(e){
      throw e;
    }
  }
}

