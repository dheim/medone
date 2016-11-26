import 'babel-polyfill';

class API {

	constructor(base) {
		this.base = base;
	}

    /**
     *
     * @param {string} endpoint
     * @returns {Promise}
     */
	async get(endpoint) {
		return fetch(`${this.base}/${endpoint}`, {
			method: 'GET'
		}).then(res => res.json());
	}

	post(endpoint, body) {
		return fetch(`${this.base}/${endpoint}`, {
			method: 'POST',
			headers: this.createJsonHeaders(),
			body
		});
	}

	put(endpoint, body) {
		return fetch(`${this.base}/${endpoint}`, {
			method: 'PUT',
			headers: this.createJsonHeaders(),
			body
		});
	}

	createJsonHeaders() {
		return new Headers({
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		});
	}
}

export const api  = new API(`${window.location.origin}/api`);