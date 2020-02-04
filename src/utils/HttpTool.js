import axios from 'axios';

const API_BaseUrl = {
	dev: 'https://mdlanddev.mdland.com/ezHealthEmpApiService/',
	pro: 'https://mobile.mdland.com/ezHealthEmpApiService/'
};

const HttpTool = {
	post(api, param, success, fail, cb) {
		// let apiUrl = process.env.NODE_ENV === 'production' ? API_BaseUrl.pro : API_BaseUrl.dev;
		axios.defaults.baseURL = API_BaseUrl.pro;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.withCredentials = true

		// store.dispatch(actions.toggleLoadingOn());
		axios.post(api, param)
		.then(response => {
			// console.log("HttpTool", api, response) //Debug
			success && success(response);
		})
		.then(callback => {
			cb && cb()
		})
		.catch(error => {
			console.log(`${api} error caught: ${error}`)
			fail && fail(error)
		});
	},
}

export default HttpTool
