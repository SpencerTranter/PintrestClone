import {UserActions, UserTypes} from '../actions/user.action';

export interface UserState {
  authenticatedUser: any;
  authToken: string;
  images: any;
}

export const initialState: UserState = {
  authenticatedUser: null,
  authToken: '',
  images: [],
};

export function reducer(state: UserState = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserTypes.GET_TOKEN:
      return Object.assign({}, state, {});
    case UserTypes.GET_TOKEN_SUCCESS:
      return Object.assign({}, state, { authToken: action.payload });
    case UserTypes.GET_TOKEN_ERROR:
      return Object.assign({}, state, {});
    case UserTypes.GET_USER:
      return Object.assign({}, state, {});
    case UserTypes.GET_USER_SUCCESS:
      return Object.assign({}, state, { authenticatedUser: action.payload });
    case UserTypes.ADD_USER_IMAGE:
      return Object.assign({}, state, { images: [...state.images, action.payload] });
    case UserTypes.DELETE_USER_IMAGE:
      const newImages = state.images.filter(image => image.id === action.payload.id);
      return Object.assign({}, state, { images: newImages });
    default:
      return state;
  }


}
