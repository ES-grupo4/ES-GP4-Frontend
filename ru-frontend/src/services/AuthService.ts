import axios from "axios";

class AuthService {
	baseUrl = window._env_.REACT_APP_API_URL;
	endpoint;

	constructor() {
		this.endpoint = "authenticate";
	}

	authenticate(requestData = {}) {
		return axios.post(`${this.baseUrl}/${this.endpoint}`, requestData);
	}
}

const instance = new AuthService();

export default instance;
