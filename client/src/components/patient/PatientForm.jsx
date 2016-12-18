import React, {Component} from 'react';

import {api} from 'services/api';

import {Link, browserHistory} from 'react-router';

import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Snackbar from 'material-ui/Snackbar';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class PatientForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			saved: false
		};
	}

	async componentDidMount() {
		const patient = await api.get(`patient/${this.props.routeParams.id}`);
		if (patient && patient.id) {
			patient.birthday = new Date(patient.birthday);
			this.setState({patient});
		}
	}

	save(event) {
		event.preventDefault();

		const form 		= event.target;
		let formData 	= this.state.patient;

		api.put(form.getAttribute('data-action'), JSON.stringify(this.state.patient)).then( (result) => {
			this.setState({saved: true});
		})
	}

	handleChange(event, value) {
		let field;
		if (event === null) {
			field = 'birthday';
		} else {
			field = event.target.name;
		}

		let patient = this.state.patient;
		patient[field] = value;

		this.setState({patient});
	}

	render() {
		if (this.state.patient) {
			return (<div>
				<form id="patient-form" onSubmit={this.save.bind(this)} data-action={`patient/${this.state.patient.id}`}>

					<TextField onChange={(event, value) => this.handleChange(event, value)} type="number" fullWidth={true} name="id" floatingLabelText="id" defaultValue={this.state.patient.id} />
					<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" fullWidth={true} autoFocus={true} name="givenname" floatingLabelText="givenname" defaultValue={this.state.patient.givenname} />

					<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" fullWidth={true} name="surname" floatingLabelText="surname" defaultValue={this.state.patient.surname} />
					<DatePicker onChange={(event, value) => this.handleChange(event, value)} name="birthday" floatingLabelText="birthday" defaultDate={this.state.patient.birthday} />

					<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" fullWidth={true} name="streetaddress" floatingLabelText="address" defaultValue={this.state.patient.streetaddress} />
					<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" name="zipcode" floatingLabelText="zipcode" defaultValue={this.state.patient.zipcode} />
					<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" fullWidth={true} name="city" floatingLabelText="city" defaultValue={this.state.patient.city} />
					<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" fullWidth={true} name="country" floatingLabelText="country" defaultValue={this.state.patient.country} />
					<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" name="telephonenumber" floatingLabelText="phone" defaultValue={this.state.patient.telephonenumber} />
					<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" fullWidth={true} name="emailaddress" floatingLabelText="email" defaultValue={this.state.patient.emailaddress} />
					<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" name="bloodtype" floatingLabelText="blood type" defaultValue={this.state.patient.bloodtype} />
					<TextField onChange={(event, value) => this.handleChange(event, value)} type="text" fullWidth={true} name="occupation" floatingLabelText="occupation" defaultValue={this.state.patient.occupation} />

					<RadioButtonGroup onChange={(event, value) => this.handleChange(event, value)} name="gender" defaultSelected={this.state.patient.gender}>
						<RadioButton value="m" label="male" />
						<RadioButton value="f" label="female" />
					</RadioButtonGroup>

					<br/>
					<div>
						<RaisedButton label="save" primary={true} type="submit" icon={<i className="fa fa-save" />} />
						<RaisedButton label="back" secondary={true} containerElement={<Link to="/" />} />
					</div>
				</form>

				<Snackbar
          open={this.state.saved}
          message="Saved!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

			</div>);
		} else {
			return (<CircularProgress size={80} thickness={5} />);
		}
	}
}

export default PatientForm;