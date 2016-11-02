import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import PatientList from 'components/PatientList';
import PatientForm from 'components/PatientForm';
import PrescriptionForm from 'components/PrescriptionForm';
import PrescriptionList from 'components/PrescriptionList';

import AppBar from 'material-ui/AppBar';

import 'font-awesome-webpack';
import 'less/imports';


class AppComponent extends Component {
    render() {
        return (<MuiThemeProvider>
            <div>
                <AppBar title="medONE"
                            showMenuIconButton={true}
                            iconClassNameLeft="fa fa-medkit"
                            />
                    <div id="main-view">{this.props.children}</div>
            </div>
        </MuiThemeProvider>);
    }
}

render(<Router history={hashHistory}>
    <Route component={AppComponent}>
        <Route path="/" component={PatientList}/>
        <Route path="/patient/:id" component={PatientForm}/>
        <Route path="/prescriptions" component={PrescriptionList}/>
    </Route>
</Router>, document.getElementById('root'));