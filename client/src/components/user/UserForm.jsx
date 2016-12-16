import React, {Component} from 'react';
import {render} from 'react-dom';

import TextField from 'material-ui/TextField';

class UserForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			stuff: true
		};
	}

	componentDidMount() {
		this.saveBtn = document.getElementById('form-submit');
		this.saveBtn.addEventListener('click', this.handleSubmit.bind(this));
	}

	componentWillUnmount() {
		this.saveBtn.removeEventListener('click', this.handleSubmit.bind(this));
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this);
	}

	render() {
		return (<div>
			<form onSubmit={(event) => this.handleSubmit(event)} autoComplete="off">

				<TextField type="text" name="username" autoFocus={true} fullWidth={true} floatingLabelText="Username"/>

			</form>
		</div>);
	}

}

export default UserForm;