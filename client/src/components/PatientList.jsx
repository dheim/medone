import React, {Component} from 'react';

import {Link} from 'react-router';
import {Gender} from 'components/VisualHelpers';

class PatientList extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		fetch('http://192.168.1.57:3000/api/patient').then(res => res.json()).then( (result) => {

			let patients = result.slice(0, 20);

			this.setState({patients});
		});
	}

	render() {

		if (this.state.patients) {
			return (<div>
				<table>
				<thead>
					<tr>
						<th colSpan="2">#</th>
						<th>name</th>
						<th>surname</th>
						<th>date of birth</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				{this.state.patients.map( (patient) => {
					return (<tr key={patient.id}>
						<td>{patient.id}</td>
						<td><Gender gender={patient.gender} /></td>
						<td>{patient.givenname}</td>
						<td>{patient.surname}</td>
						<td>{patient.birthday}</td>
						<td>
							<Link to={`/patient/${patient.id}`}><i className="fa fa-list"/></Link>
						</td>
					</tr>);
				})}
				</tbody>
				</table>
			</div>);
		} else {
			return <div><span className="loading">load patients</span></div>;
		}
	}
}

export default PatientList;