interface IRepoItemProps {
	repo: {
		html_url: string
		name: string
		forks_count: number
		stargazers_count: number
	}
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