import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://api.spotify.com.';

  constructor() { }

}
