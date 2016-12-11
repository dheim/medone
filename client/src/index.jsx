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
import FlatButton from 'material-ui/FlatButton';
import {token} from 'services/token';

import 'font-awesome-webpack';
import 'less/imports';

class AppAccountState extends Component {

    logout() {
        localStorage.removeItem('token');
        hashHistory.push('/');
    }

    render() {
        const _token = token.get();
        
        if (_token) {
            return (<FlatButton onClick={this.logout.bind(this)} label={(<span>{_token.username} <i className="fa fa-sign-out"/></span>)}/>);
        } else {
            return (<FlatButton href="/" label="Login" />);
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

class LandingPage extends Component {
    render() {
        return (<div>
            {token.get() ? <PatientSearchPage/> : <LoginForm/>}
        </div>);
    }
}

render(
    <Router history={hashHistory}>
        <Route component={AppComponent}>
            <Route path="/patient/:id" component={PatientForm}/>
            <Route path="/prescriptions" component={PrescriptionList}/>
            <Route path="*" component={LandingPage}/>
        </Route>
    </Router>,
    document.getElementById('root'));