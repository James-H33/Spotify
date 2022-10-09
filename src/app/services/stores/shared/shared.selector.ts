import { createSelector } from '@ngrx/store';
import { IAppState } from '../app-state';
import { ISharedState } from './shared.reducer';

export const selectShared = (state: IAppState) => state.shared;

export const selectUser = createSelector(
  selectShared,
  (state: ISharedState) => state.user
);

export const selectToken = createSelector(
  selectShared,
  (state: ISharedState) => state.token
);

export const selectCurrentTrack = createSelector(
  selectShared,
  (state: ISharedState) => state.currentTrack
);

export const selectPlaySong = createSelector(
  selectShared,
  (state: ISharedState) => state.play
);
