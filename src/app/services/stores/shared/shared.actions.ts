import { createAction } from '@ngrx/store';
import { Track } from '../../api/models/track';

export const SetUser = createAction(
  '[Shared] Set User',
    (user: any) => ({ user })
)

export const SetAuthToken = createAction(
  '[Shared] Set Auth User',
    (token: any) => ({ token })
)

export const SetCurrentTrack = createAction(
  '[Shared] Set Current Track',
    (track: Track, play?: boolean) => ({ track, play: play || false })
)

export const SetPlaySong = createAction(
  '[Shared] Set Is Playing',
    (play: boolean) => ({ play })
)

export const SharedActions = {
  SetUser,
  SetAuthToken,
  SetCurrentTrack,
  SetPlaySong
}
