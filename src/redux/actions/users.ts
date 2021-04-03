import { Dispatch } from "redux";
import { API } from "../../api/api";
import { IUserFullInfo } from "../reducers/users.types";

export enum USERS_ACTION_TYPES {
	SET_USERS = 'SET_USERS',
	SET_SEARCH = 'SET_SEARCH',
	SET_PENDING = 'SET_PENDING',
	SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
	UPDATE_USER = 'UPDATE_USER',
	SET_LOADING_ERROR = 'SET_LOADING_ERROR',
}

export const searchUsers = (query: string, page: number) => async (dispatch: Dispatch) => {
	try {
		dispatch({
			type: USERS_ACTION_TYPES.SET_PENDING,
			payload: true
		});

		const { items, total_count } = await API.searchUsers(query, page);

		const users: IUserFullInfo[] = [];
		for (const item of items) {
			const user = await API.getUser(item.login);
			users.push(user);
		}

		dispatch({
			type: USERS_ACTION_TYPES.SET_USERS,
			payload: {
				entities: users,
				totalCount: total_count
			}
		})
	} catch (error) {
		!!error.message && dispatch(setUsersLoadingError(error.message));
	}
}

export const setUsersSearch = (query: string) => ({
	type: USERS_ACTION_TYPES.SET_SEARCH,
	payload: query
})

export const setUsersCurrentPage = () => ({
	type: USERS_ACTION_TYPES.SET_CURRENT_PAGE
})

export const updateUser = (user: IUserFullInfo) => ({
	type: USERS_ACTION_TYPES.UPDATE_USER,
	payload: user
})

export const setUsersLoadingError = (text: string) => ({
	type: USERS_ACTION_TYPES.SET_LOADING_ERROR,
	payload: text
})
