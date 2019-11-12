import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import * as fromUser from './user.reducer';

export interface AppState {
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.reducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', JSON.stringify(state));
    console.log('action', JSON.stringify(action));

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [logger];
