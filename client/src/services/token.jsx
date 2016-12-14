import jwtDecode from 'jwt-decode';

class Token {

	constructor(key = 'token') {
		this.key = key;
	}

	decode(token) {
		return jwtDecode(token);
	}

	get(untouched = false) {
		const token = localStorage.getItem(this.key);
		if (token) {
			return (untouched) ? token : this.decode(token);
		} else {
			return false;
		}
	}

	isValid() {
		const token = this.get();
		return (token.role);
	}

	set(token) {
		localStorage.setItem(this.key, token);
		return this;
	}

	remove() {
		localStorage.removeItem(this.key);
	}
}

export const token = new Token();