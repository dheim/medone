import 'babel-polyfill';

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import LoginForm from 'components/LoginForm';
import PatientForm from 'components/PatientForm';
import PrescriptionList from 'components/PrescriptionList';
import PatientSearchPage from './components/PatientSearchPage';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {token} from 'services/token';

import 'font-awesome-webpack';
import 'less/imports';

class AppAccountState extends Component {

    logout() {
        localStorage.removeItem('token');
        hashHistory.push('/login');
    }

    render() {
        const _token = token.get();
        
        if (_token) {
            return (<FlatButton onClick={this.logout.bind(this)} label={(<span>{_token.username} <i className="fa fa-sign-out"/></span>)}/>);
        } else {
            return (<FlatButton containerElement={<Link to="/login"/>} label="Login" />);
        }
    }
}

class AppComponent extends Component {

    handleClick() {
        hashHistory.push('/');
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="medONE"
                            showMenuIconButton={true}
                            onTitleTouchTap={this.handleClick}
                            iconClassNameLeft="fa fa-medkit"
                            iconElementRight={<AppAccountState/>}
                            />
                    <div id="main-view">{this.props.children}</div>
                </div>
            </MuiThemeProvider>);
    }
}

render(
    <Router history={hashHistory}>
        <Route component={AppComponent}>
            <Route path="/login" component={LoginForm}/>
            <Route path="/search" component={PatientSearchPage}/>
            <Route path="/patient/:id" component={PatientForm}/>
            <Route path="/prescriptions" component={PrescriptionList}/>
            <Route path="*" component={PatientSearchPage}/>
        </Route>
    </Router>,
    document.getElementById('root'));