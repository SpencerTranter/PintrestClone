import {UserActions, UserTypes} from '../actions/user.action';

export interface UserState {
  authenticatedUser: any;
  authToken: string;
}

export const initialState: UserState = {
  authenticatedUser: null,
  authToken: ''
};

export function reducer(state: UserState = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserTypes.GET_TOKEN:
      console.log('reducer');
      return Object.assign({}, state, {});
    case UserTypes.GET_TOKEN_SUCCESS:
      return Object.assign({}, state, { authToken: action.payload });
    case UserTypes.GET_TOKEN_ERROR:
      return Object.assign({}, state, {});
    case UserTypes.GET_USER:
      return Object.assign({}, state, {});
    case UserTypes.GET_USER_SUCCESS:
      return Object.assign({}, state, { authenticatedUser: action.payload });
    default:
      return state;
  }


}
