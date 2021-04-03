import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com/';

if (process.env.REACT_APP_GITHUB_API_TOKEN) {
	axios.defaults.headers = {
		Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
	}
}

axios.interceptors.response.use(
	response => {
		// Do something with response data
		return Promise.resolve(response.data);
	},
	error => {
		// Do something with response error
		return Promise.reject(error);
	});
