import { IRepo } from "../../../redux/reducers/users.types";

interface IRepoItemProps {
	repo: IRepo
}

export const RepoItem = ({ repo }: IRepoItemProps) => (
	<li className='repo-item'>
		<a href={repo.html_url} target='_blank' rel="noreferrer">
			{repo.name}
		</a>
		<div>
			<span>{repo.forks_count} Forks</span>
			<span>{repo.stargazers_count} Stars</span>
		</div>
	</li>
)