import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/shell';
import { IAppState } from '../stores/app-state';
import { SharedActions } from '../stores/shared/shared.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private store: Store<IAppState>
  ) { }

  public async login() {
    let url: string = await invoke("get_spotify_auth_url");
    this.pollForToken();
    open(url);
  }

  public async pollForToken() {
    setTimeout(async () => {
      let token: string = await invoke("get_token");

      if (token) {
        localStorage.setItem('access_token', token);
        this.store.dispatch(SharedActions.SetAuthToken(token));
      } else {
        this.pollForToken();
      }
    }, 1000);
  }
}
