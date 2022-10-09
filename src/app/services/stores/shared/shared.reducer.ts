import { createReducer, on } from '@ngrx/store';
import { Track } from '../../api/models/track';
import { SharedActions } from './shared.actions';

export interface ISharedState {
  user: any;
  token: string;
  isLoggedIn: boolean;
  currentTrack: Track;
  play: boolean;
}

export const initialState: ISharedState = {
  user: null,
  token: '',
  isLoggedIn: false,
  currentTrack: null as any,
  play: false
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
  }),

  on(SharedActions.SetCurrentTrack, (s, { track, play }) => {
  return {
      ...s,
      currentTrack: track,
      play
    };
  }),

  on(SharedActions.SetPlaySong, (s, { play }) => {
    return {
      ...s,
      play
    };
  })
);
