export interface IInitialUsersState {
	entities: IUserFullInfo[],
	search: string,
	totalCount: number,
	currentPage: number,
	pending: boolean,
	loadingError: string | null,
}

export interface IUsersDataResponse {
	incomplete_results: boolean,
	items: IUserInfo[],
	total_count: number
}

export interface IUserInfo {
	avatar_url: string,
	events_url: string,
	followers_url: string,
	following_url: string,
	gists_url: string,
	gravatar_id: string,
	html_url: string,
	id: number,
	login: string,
	node_id: string,
	organizations_url: string,
	received_events_url: string,
	repos_url: string,
	score: number,
	site_admin: boolean
	starred_url: string,
	subscriptions_url: string,
	type: string,
	url: string,
}

export interface IUserFullInfo {
	avatar_url?: string,
	bio?: string | null,
	created_at?: string,
	email?: string | null,
	followers?: number,
	following?: number,
	html_url?: string,
	id?: number,
	location?: string | null,
	login?: string,
	name?: string,
	public_repos?: number,
	url?: string,
	repos?: IRepo[],
	searchRepos?: string,
	reposPage?: number,
	totalReposCount?: number | null,
}

export interface IRepo {
	id: number,
	html_url: string
	name: string
	forks_count: number
	stargazers_count: number
}

export interface IReposResponse {
	items: IRepo[],
	total_count: number,
}
