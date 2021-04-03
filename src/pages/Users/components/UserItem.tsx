import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../constants";
import { IUserFullInfo } from "../../../redux/reducers/users.types";

interface IUserItemProps {
	user: IUserFullInfo
}

export const UserItem = ({ user }: IUserItemProps) => {
	const { login, avatar_url, public_repos } = user;
	return (
		<li className='user-item'>
			<NavLink to={`${ROUTES.user}/${login}`}>
				<img className="user-item__ava" src={avatar_url} alt="avatar" />
				<span className="user-item__name">{login}</span>
				<span className="user-item__repos">Repo: {public_repos}</span>
			</NavLink>
		</li>
	)
};