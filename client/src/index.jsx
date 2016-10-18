import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import Header from 'components/Header';

import PatientList from 'components/PatientList';
import PatientForm from 'components/PatientForm';
import PrescriptionForm from 'components/PrescriptionForm';

import 'font-awesome-webpack';
import 'less/imports';

class AppComponent extends Component {
    render() {
        return (<div id="main-container">
            <Header/>
            <div id="main-content">
                {this.props.children}
            </div>
        </div>);
    }
}

render(<Router history={hashHistory}>
    <Route component={AppComponent}>
        <Route path="/" component={PatientList}/>
        <Route path="/patient/:id" component={PatientForm}/>
        <Route path="/prescription" component={PrescriptionForm}/>
    </Route>
</Router>, document.getElementById('root'));