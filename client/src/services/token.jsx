import jwtDecode from 'jwt-decode';

class Token {

	constructor(key = 'token') {
		this.key = key;
	}

	decode(token) {
		return jwtDecode(token);
	}

	get() {
		const token = localStorage.getItem(this.key);
		return (token) ? this.decode(token) : null;
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