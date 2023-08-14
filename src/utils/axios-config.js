import axios from 'axios';

export default axios.interceptors.request.use(config => {
	// if we need hard code bearer token
	return config;
});