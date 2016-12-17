import React, {Component} from 'react';
import {render} from 'react-dom';

import {api} from 'services/api';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class UserForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {},

			error: false,
			errorMessage: ''
		};
	}

	componentDidMount() {
		this.saveBtn = document.getElementById('form-submit');
		this.saveBtn.addEventListener('click', this.handleSubmit.bind(this));
	}

	componentWillUnmount() {
		this.saveBtn.removeEventListener('click', this.handleSubmit.bind(this));
	}

	handleChange(event, value) {
		let target = (event.target.name) ? event.target.name : 'role';
		let user = this.state.user;
		user[target] = value;
		this.setState({user});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (!this.state.user.username) {
			this.setState({error: true, errorMessage: 'Username is missing!'});
		} else if (!this.state.user.lastName) {
			this.setState({error: true, errorMessage: 'Lastname is missing!'});
		} else if (!this.state.user.firstName) {
			this.setState({error: true, errorMessage: 'Firstname is missing!'});
		} else if (!this.state.user.password) {
			this.setState({error: true, errorMessage: 'Password is missing!'});
		} else if (!this.state.user.role) {
			this.setState({error: true, errorMessage: 'Role is missing!'});
		} else {
			this.save();
		}
	}

	resetError() {
    this.setState({error: false, errorMessage: ''});
  }

	save() {
		let userData = {
			username: this.state.user.username,
			firstName: this.state.user.firstName,
			lastName: this.state.user.lastName,
			password: this.state.user.password,
			role: this.state.user.role,
		};

		api.post('user', JSON.stringify(userData)).then( result => {
			this.props.actions.close();
			this.props.actions.save();

			this.props.onChange();
		});
	}

	render() {
		return (<div>
			<form onSubmit={(event) => this.handleSubmit(event)} autoComplete="off">

				<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" name="username" autoFocus={true} fullWidth={true} floatingLabelText="Username"/>
				<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" name="lastName" fullWidth={true} floatingLabelText="Lastname"/>
				<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" name="firstName" fullWidth={true} floatingLabelText="Firstname"/>
				<TextField onChange={(event, value) => this.handleChange(event, value)} type="password" name="password" fullWidth={true} floatingLabelText="Password"/>

				<SelectField name="role" floatingLabelText="Role" value={this.state.user.role} onChange={(event, key, value) => this.handleChange(event, value)}>
          <MenuItem value={'NURSE'} primaryText="Nurse" />
          <MenuItem value={'DOCTOR'} primaryText="Doctor" />
          <MenuItem value={'ADMIN'} primaryText="Admin" />
        </SelectField>

			</form>
			<Snackbar open={this.state.error} message={this.state.errorMessage} autoHideDuration={2500} onRequestClose={this.resetError.bind(this)} />
		</div>);
	}

}

export default UserForm;