import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";

import { searchUsers, setUsersCurrentPage, setUsersSearch } from '../../redux/actions/users';
import { selectUsersSearch, selectUsers, selectIsNextPage, selectUsersCurrentPage, selectUsersPending, selectUsersLoadingError, selectUsersTotalCount } from '../../redux/selectors/users';

import './Users.scss';
import { UserItem } from './components/UserItem';
import { Spinner } from '../../components/Spinner/Spinner';
import { USERS_LIMIT_PER_PAGE } from '../../constants';


export const Users = () => {
	const dispatch = useDispatch();
	const search = useSelector(selectUsersSearch);
	const users = useSelector(selectUsers);
	const currentPage = useSelector(selectUsersCurrentPage);
	const pending = useSelector(selectUsersPending);
	const totalCount = useSelector(selectUsersTotalCount);
	const loadingError = useSelector(selectUsersLoadingError);
	const isNextPage = useSelector(selectIsNextPage);
	const isNeedSearch = useRef(false);

	useEffect(() => {
		(!!search.trim() && isNeedSearch.current)
			? dispatch(searchUsers(search, currentPage))
			: isNeedSearch.current = true;
	}, [search, currentPage]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setUsersSearch(e.target.value));
	const loadMore = () => dispatch(setUsersCurrentPage());

	return <div className='users'>
		<input
			value={search}
			onChange={handleSearchChange}
			type="text"
			placeholder='Search for Users'
		/>

		<InfiniteScroll
			next={loadMore}
			hasMore={isNextPage}
			loader={<></>}
			dataLength={users.length + USERS_LIMIT_PER_PAGE}
		>
			<ul className="users__list">
				{users.map(user => <UserItem key={user.id} user={user} />)}
				{pending && <Spinner />}
				{!pending && !!search && !totalCount && !loadingError && <p className='empty'>Empty</p>}
			</ul>
		</InfiniteScroll>

		{!!loadingError && <p className='error'>{loadingError}</p>}
	</div>
}