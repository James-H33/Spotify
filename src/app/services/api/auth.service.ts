import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/shell';
import { BehaviorSubject } from 'rxjs';

const initialState = {
  token: '',
  isLoggenIn: false
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public $state: BehaviorSubject<any> = new BehaviorSubject(initialState);

  public async login() {
    let url: string = await invoke("get_spotify_auth_url");

    open(url);

    this.pollForToken();
  }

  public async pollForToken() {
    setTimeout(async () => {
      let token: string = await invoke("get_token");

      if (token) {
        console.log('Token found');
        this.$state.next({ token, isLoggedIn: true });
      } else {
        this.pollForToken();
      }
    }, 1000);
  }
}
