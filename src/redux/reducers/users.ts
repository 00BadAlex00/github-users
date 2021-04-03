import { USERS_ACTION_TYPES } from '../actions/users';
import { IAction } from '../../interfaces/interfaces';
import { IInitialUsersState, IUserFullInfo } from './users.types';


const initialState: IInitialUsersState = {
  entities: [],
  search: '',
  totalCount: 0,
  currentPage: 1,
  pending: false,
  loadingError: null,
}

export const users = (state = initialState, action: IAction): IInitialUsersState => {
  const { type, payload } = action;

  switch (type) {
    case USERS_ACTION_TYPES.SET_USERS: {
      return {
        ...state,
        entities: [...state.entities, ...payload.entities],
        totalCount: payload.totalCount,
        pending: false,
      }
    }

    case USERS_ACTION_TYPES.SET_SEARCH: {
      return {
        ...state,
        search: payload,
        entities: [],
        totalCount: 0,
        currentPage: 1,
        loadingError: '',
        pending: !!payload.trim()
      }
    }

    case USERS_ACTION_TYPES.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: state.currentPage + 1
      }
    }

    case USERS_ACTION_TYPES.UPDATE_USER: {
      return {
        ...state,
        entities: state.entities.map((user: IUserFullInfo) => user.id === payload.id ? payload : user),
      }
    }

    case USERS_ACTION_TYPES.SET_LOADING_ERROR: {
      return {
        ...state,
        loadingError: payload,
        pending: false,
      }
    }

    case USERS_ACTION_TYPES.SET_PENDING: {
      return {
        ...state,
        pending: payload
      }
    }

    default:
      return state;
  }
}