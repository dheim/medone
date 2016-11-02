import React, {Component} from 'react';

import {api} from 'services/api';

import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';


import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class PatientForm extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		const patient = await api.get(`patient/${this.props.routeParams.id}`);
		this.setState({patient});
	}

	save(event) {
		event.preventDefault();
		let form = event.target;
		let formData = new FormData(form);

		api.put(form.getAttribute('data-action'), formData).then( (result) => {
			console.log('Result: ', result)
		});
	}

	render() {
		if (this.state.patient) {
			return (<div>
				<form id="patient-form" onSubmit={this.save.bind(this)} data-action={`patient/${this.state.patient.id}`}>

					<TextField type="number" name="id" defaultValue={this.state.patient.id} />
					<TextField type="text" name="givenname" defaultValue={this.state.patient.givenname} />

					<TextField type="text" name="surname" defaultValue={this.state.patient.surname} />
					<TextField type="text" name="birthday" defaultValue={this.state.patient.birthday} />
					<TextField type="text" name="streetaddress" defaultValue={this.state.patient.streetaddress} />
					<TextField type="text" name="zipcode" defaultValue={this.state.patient.zipcode} />
					<TextField type="text" name="city" defaultValue={this.state.patient.city} />
					<TextField type="text" name="country" defaultValue={this.state.patient.country} />
					<TextField type="text" name="telephonenumber" defaultValue={this.state.patient.telephonenumber} />
					<TextField type="text" name="emailaddress" defaultValue={this.state.patient.emailaddress} />
					<TextField type="text" name="bloodtype" defaultValue={this.state.patient.bloodtype} />
					<TextField type="text" name="occupation" defaultValue={this.state.patient.occupation} />


					<RadioButtonGroup name="gender" defaultSelected={this.state.patient.gender}>
						<RadioButton value="m" label="male" />
						<RadioButton value="f" label="female" />
					</RadioButtonGroup>

					<RaisedButton label="save" primary={true} type="submit" icon={<i className="fa fa-save" />} />
					<RaisedButton label="back" secondary={true} href="/" />
				</form>
			</div>);
		} else {
			return (<CircularProgress size={80} thickness={5} />);
		}
	}
}

export default PatientForm;