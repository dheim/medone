import React, {Component} from 'react';

import {api} from 'services/api';

import {RadioGroup} from 'components/VisualHelpers';

class PatientForm extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		api.get(`patient/${this.props.routeParams.id}`).then( (result) => {
			this.setState({patient: result});
		});
	}

	save(event) {
		event.preventDefault();
		let form = event.target;
		let formData = new FormData(form);

		api.post(form.getAttribute('data-action'), formData).then( (result) => {
			console.log('Result: ', result)
		});
	}

	render() {
		if (this.state.patient) {
			return (<div>
				<form onSubmit={this.save.bind(this)} data-action={`patient/${this.state.patient.id}`}>
					<input type="number" name="id" defaultValue={this.state.patient.id}/>

					<input type="text" name="givenname" defaultValue={this.state.patient.givenname}/>

					<input type="text" name="surname" defaultValue={this.state.patient.surname}/>
					<input type="text" name="birthday" defaultValue={this.state.patient.birthday}/>
					<input type="text" name="streetaddress" defaultValue={this.state.patient.streetaddress}/>
					<input type="text" name="zipcode" defaultValue={this.state.patient.zipcode}/>
					<input type="text" name="city" defaultValue={this.state.patient.city}/>
					<input type="text" name="country" defaultValue={this.state.patient.country}/>
					<input type="text" name="telephonenumber" defaultValue={this.state.patient.telephonenumber}/>
					<input type="text" name="emailaddress" defaultValue={this.state.patient.emailaddress}/>
					<input type="text" name="bloodtype" defaultValue={this.state.patient.bloodtype}/>
					<input type="text" name="occupation" defaultValue={this.state.patient.occupation}/>


					<RadioGroup name="gender" options={['f', 'm']} selected={this.state.patient.gender}/>

					<button type="submit">Save</button>
				</form>
			</div>);
		} else {
			return <div><span className="loading">load patient-data</span></div>;
		}
	}
}

export default PatientForm;