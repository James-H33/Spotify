import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'https://api.spotify.com/v1';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  public getUser() {
    let url = `${this.baseUrl}/me`;
    let token = this.auth.$state.getValue().token;

    const headers = {
      'Authorization': `Bearer ${token}`
    }

    return this.http.get(url, { headers })
      .pipe(
        tap((response) => console.log(response))
      )
  }
}
