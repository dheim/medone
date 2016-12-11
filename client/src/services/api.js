import 'babel-polyfill';
import {hashHistory} from 'react-router';
import {token} from 'services/token';

class API {

	constructor(base) {
		this.base = base;
	}

	handleError(res) {
		if (res.status === 403) {
			token.remove();
			hashHistory.push('/');
		}
		return res;
	}

	/**
	 *
	 * @param {string} endpoint
	 * @returns {Promise}
	 */
	async get(endpoint) {
		return fetch(`${this.base}/${endpoint}`, {
			method: 'GET',
			headers: this.createHeaders()
		})
		.then(this.handleError)
		.then(res => res.json());
	}

	post(endpoint, body) {
		return fetch(`${this.base}/${endpoint}`, {
			method: 'POST',
			headers: this.createHeaders(),
			body
		}).then(this.handleError);
	}

	put(endpoint, body) {
		return fetch(`${this.base}/${endpoint}`, {
			method: 'PUT',
			headers: this.createHeaders(),
			body
		}).then(this.handleError);
	}

	createHeaders() {
		const _token = token.get(true);
		let tokenHeader = _token ? {'x-access-token': _token} : {};

		return new Headers({
				...tokenHeader,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
		});
	}
}

export const api  = new API(`${window.location.origin}/api`);