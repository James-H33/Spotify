import { createReducer, on } from '@ngrx/store';
import { SharedActions } from './shared.actions';

export interface ISharedState {
  user: any;
  token: string;
  isLoggedIn: boolean;
}

export const initialState: ISharedState = {
  user: null,
  token: '',
  isLoggedIn: false
}

export const sharedReducer = createReducer(

  initialState,

  on(SharedActions.SetUser, (s, { user }) => {
    return {
      ...s,
      user
    };
  }),

  on(SharedActions.SetAuthToken, (s, { token }) => {
    console.log('SetAuthToken', token);

    return {
      ...s,
      token,
      isLoggedIn: true
    };
  })
);
