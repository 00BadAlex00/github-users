import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

import { API } from '../../api/api';
import { REPOS_COUNT_PER_PAGE } from '../../constants';
import { convertDateToString } from '../../utils/convertDateToString';
import { updateUser } from '../../redux/actions/users';
import { selectUser } from '../../redux/selectors/users';
import { IUserFullInfo } from '../../redux/reducers/users.types';
import { AppState } from '../../redux/store';

import './User.scss';
import { Spinner } from '../../components/Spinner/Spinner';
import { RepoItem } from './components/RepoItem';


export const User = () => {
	const dispatch = useDispatch();
	const { username } = useParams<{ username: string }>();
	const user = useSelector((state: AppState) => selectUser(state, username));
	const [loadedUser, setLoadedUser] = useState<IUserFullInfo | undefined>();
	const [errorGettingUser, setErrorGettingUser] = useState<string | undefined>();
	const [reposError, setReposError] = useState<string | undefined>();

	const currentUser = user ? user : loadedUser;
	const setCurrentUser: any = user ? (updatedUser: IUserFullInfo) => { dispatch(updateUser(updatedUser)) } : setLoadedUser;

	const isNextPage = !errorGettingUser && !reposError && (!!currentUser?.searchRepos
		? currentUser.repos?.length !== currentUser.totalReposCount
		: currentUser?.repos?.length !== currentUser?.public_repos
	)

	useEffect(() => {
		if (currentUser) {
			//first load
			if (!currentUser.searchRepos && !currentUser.repos?.length && currentUser.public_repos !== 0) {
				API.getUserRepos(username)
					.then(repos => {
						setCurrentUser({ ...currentUser, repos, reposPage: 1 })
					})
					.catch(err => setReposError(err.message))
			}
			//load more
			else if (!currentUser.searchRepos
				&& isNextPage
				&& (currentUser.reposPage || 0) * REPOS_COUNT_PER_PAGE > (currentUser.repos?.length || 0)
			) {
				API.getUserRepos(username, currentUser.reposPage)
					.then(repos => {
						setCurrentUser({ ...currentUser, repos: [...(currentUser.repos || []), ...repos] })
					})
					.catch(err => setReposError(err.message))
			}
			//first load when searching
			if (!!currentUser.searchRepos && !currentUser.repos?.length && currentUser?.totalReposCount !== 0) {
				API.getSearchUserRepos(username, currentUser.searchRepos)
					.then(result => {
						setCurrentUser({
							...currentUser,
							repos: result.items,
							totalReposCount: result.total_count
						})
					})
					.catch(err => setReposError(err.message))
			}
			// load more repositories when searching
			else if (!!currentUser.searchRepos
				&& isNextPage
				&& (currentUser.reposPage || 0) * REPOS_COUNT_PER_PAGE > (currentUser.repos?.length || 0)
			) {
				API.getSearchUserRepos(username, currentUser.searchRepos, currentUser.reposPage)
					.then(result => {
						setCurrentUser({ ...currentUser, repos: [...(currentUser.repos || []), ...result.items], })
					})
					.catch(err => setReposError(err.message))
			}
		}
		else if (!currentUser) {
			API.getUser(username)
				.then(user => setCurrentUser(user))
				.catch(err => setErrorGettingUser(err.message));
		}
	}, [currentUser, user, username]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReposError('');
		setCurrentUser({
			...currentUser,
			searchRepos: e.target.value,
			reposPage: 1,
			repos: [],
			totalReposCount: null
		})
	};
	const loadMore = () => {
		setCurrentUser({ ...currentUser, reposPage: (currentUser?.reposPage || 0) + 1 })
	}

	if (!!errorGettingUser) return <p className='error'>{errorGettingUser}</p>
	if (!currentUser) return <Spinner size='60px' />
	return <div className='user'>
		<NavLink to='/' className='btn-back'>
			<svg className="icon">
				<use xlinkHref="/media/sprite.svg#back-arrow"></use>
			</svg>
		</NavLink>

		<div className='user__info-wrap'>
			<img className='user__ava' src={currentUser.avatar_url} alt="avatar" />

			<table className='user__info'>
				<tbody>
					<tr>
						<th>Login:</th>
						<th>{currentUser.login}</th>
					</tr>
					<tr>
						<th>Email:</th>
						<th>{currentUser.email || '-'}</th>
					</tr>
					<tr>
						<th>Location:</th>
						<th>{currentUser.location || '-'}</th>
					</tr>
					<tr>
						<th>Join date:</th>
						<th>{convertDateToString(currentUser.created_at)}</th>
					</tr>
					<tr>
						<th>Followers:</th>
						<th>{currentUser.followers}</th>
					</tr>
					<tr>
						<th>Following:</th>
						<th>{currentUser.following}</th>
					</tr>
				</tbody>
			</table>

			<p className='user__bio'>
				{currentUser.bio}
			</p>
		</div>

		{currentUser.public_repos
			? <>
				<input
					value={currentUser.searchRepos || ''}
					onChange={handleSearchChange}
					type="text"
					placeholder="Search for User's Repositories"
				/>

				<InfiniteScroll
					next={loadMore}
					hasMore={isNextPage}
					loader={<Spinner />}
					dataLength={currentUser.repos?.length || 0}
				>
					<ul className="users__list">
						{currentUser.repos?.map(repo => <RepoItem key={repo.id} repo={repo} />)}
					</ul>
				</InfiniteScroll>

				<p className='error'>{reposError}</p>
			</>
			: <p className='empty'>No repositories</p>
		}
	</div>
}