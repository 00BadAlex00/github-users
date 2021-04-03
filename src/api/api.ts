import axios, { Canceler } from "axios";
import { REPOS_COUNT_PER_PAGE, USERS_LIMIT_PER_PAGE } from "../constants";
import { IUserFullInfo, IUsersDataResponse } from "../redux/reducers/users.types";

let CancelToken = axios.CancelToken;

let cancelSearchUsers: Canceler;
const searchUsers = (query: string = '', page: number = 1, limit = USERS_LIMIT_PER_PAGE): Promise<IUsersDataResponse> => {
  if (cancelSearchUsers) cancelSearchUsers();
  return axios.get('search/users', {
    params: {
      q: query,
      per_page: limit,
      page,
    },
    cancelToken: new CancelToken(function executor(c) {
      cancelSearchUsers = c;
    })
  })
};

let cancelUser: Canceler
const getUser = (username: string): Promise<IUserFullInfo> => {
  if (cancelUser) cancelUser();
  return axios.get(`users/${username}`, {
    cancelToken: new CancelToken(function executor(c) {
      cancelUser = c;
    })
  })
}

const getUserRepos = (username: string, page: number = 1, limit = REPOS_COUNT_PER_PAGE): Promise<any> => (
  axios.get(`users/${username}/repos`, {
    params: {
      per_page: limit,
      page,
    }
  })
);

let cancelSearchUserRepos: Canceler
const getSearchUserRepos = (username: string, query: string = '', page: number = 1): Promise<any> => {
  if (cancelSearchUserRepos) cancelSearchUserRepos();
  return axios.get(`search/repositories?page=${page}&q=${query + encodeURIComponent(`user:${username}`)}`, {
    cancelToken: new CancelToken(function executor(c) {
      cancelSearchUserRepos = c;
    })
  })
};

export const API = {
  searchUsers,
  getUser,
  getUserRepos,
  getSearchUserRepos
};