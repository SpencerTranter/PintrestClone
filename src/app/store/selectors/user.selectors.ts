import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectFeature = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectFeature,
  (state: UserState) => state.authenticatedUser
);
