import 'babel-polyfill';

class API {

	constructor(base) {
		this.base = base;
	}

	async get(endpoint) {
		return fetch(`${this.base}/${endpoint}`, {
			method: 'GET'
		}).then(res => res.json());
	}

	post(endpoint, body) {
		return fetch(`${this.base}/${endpoint}`, {
			method: 'POST',
			body
		});
	}

	put(endpoint, body) {
		return fetch(`${this.base}/${endpoint}`, {
			method: 'PUT',
			body
		});
	}
}

export const api  = new API(`${window.location.origin}/api`);