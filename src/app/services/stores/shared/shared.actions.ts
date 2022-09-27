import { createAction } from '@ngrx/store';

export const SetUser = createAction(
  '[Shared] Set User',
  (user: any) => ({ user })
)

export const SetAuthToken = createAction(
  '[Shared] Set Auth User',
  (token: any) => ({ token })
)

export const SharedActions = {
  SetUser,
  SetAuthToken
}
