import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import Header from 'components/Header'; 

import PatientList from 'components/PatientList';
import PatientForm from 'components/PatientForm';

import 'font-awesome-webpack';
import 'less/imports';

class LandingPage extends Component {
	render() {
		return (<div id="main-container">
			<Header/>
			<div id="main-content">
				{this.props.children || <PatientList/>}
			</div>
		</div>);
	}
}

render(<Router history={browserHistory}>
	<Route path="/" component={LandingPage}>
		<Route path="/patient/:id" component={PatientForm} />
	</Route>
</Router>, document.getElementById('root'));