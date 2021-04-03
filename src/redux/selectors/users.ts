import { USERS_LIMIT_PER_PAGE } from "../../constants";
import { IUserFullInfo } from "../reducers/users.types";
import { AppState } from "../store";

export const selectUsers = (state: AppState): IUserFullInfo[] => state.users.entities;

export const selectUsersSearch = (state: AppState): string => state.users.search;

export const selectUsersCurrentPage = (state: AppState): number => state.users.currentPage;

export const selectUsersTotalCount = (state: AppState): number => state.users.totalCount;

export const selectUsersPending = (state: AppState): boolean => state.users.pending;

export const selectUsersLoadingError = (state: AppState): string | null => state.users.loadingError;

export const selectIsNextPage = (state: AppState): boolean => (
	!state.users.loadingError && (state.users.currentPage * USERS_LIMIT_PER_PAGE < state.users.totalCount)
);

export const selectUser = (state: AppState, name: string): IUserFullInfo | undefined => (
	state.users.entities.find(user => user.login === name)
);
