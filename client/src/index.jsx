import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import LoginForm from 'components/LoginForm';
import PatientForm from 'components/PatientForm';
import PrescriptionList from 'components/PrescriptionList';
import PatientSearchPage from './components/PatientSearchPage';

import AppBar from 'material-ui/AppBar';

import 'font-awesome-webpack';
import 'less/imports';


class AppComponent extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="medONE"
                            showMenuIconButton={true}
                            iconClassNameLeft="fa fa-medkit"/>
                    <div id="main-view">{this.props.children}</div>
                </div>
            </MuiThemeProvider>);
    }
}

render(
    <Router history={hashHistory}>
        <Route component={AppComponent}>
            <Route path="/" component={LoginForm}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/patientsearch" component={PatientSearchPage}/>
            <Route path="/patient/:id" component={PatientForm}/>
            <Route path="/prescriptions" component={PrescriptionList}/>
        </Route>
    </Router>,
    document.getElementById('root'));