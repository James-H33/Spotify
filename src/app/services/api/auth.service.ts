import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/shell';
import { IAppState } from '../stores/app-state';
import { SharedActions } from '../stores/shared/shared.actions';

// const initialState = {
//   token: '',
//   isLoggenIn: false
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private store: Store<IAppState>
  ) { }

  public async login() {
    let url: string = await invoke("get_spotify_auth_url");

    open(url);

    this.pollForToken();
  }

  public async pollForToken() {
    setTimeout(async () => {
      let token: string = await invoke("get_token");

      if (token) {
        console.log('Token found', token);
        this.store.dispatch(SharedActions.SetAuthToken(token));
      } else {
        this.pollForToken();
      }
    }, 1000);
  }
}
