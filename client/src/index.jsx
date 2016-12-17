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
import UserList from './components/user/UserList';

import AppBar from 'material-ui/AppBar';
import {token} from 'services/token';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

import 'font-awesome-webpack';
import 'less/imports';

class AppBarMenu extends Component {

    logout() {
        localStorage.removeItem('token');
        hashHistory.push('/login');
    }

    render() {

        const _token = token.get();
        const style = {color: 'white', marginTop: '6px', fontWeight: 'bold'};
        const icon = {lineHeight: '24px'};

        const loggedUser = (<span style={{position: 'relative', top: '-3px'}}>
                    <Avatar
                        color="grey"
                        backgroundColor="grey"
                        size={30}
                        style={style}>
                        {(_token) ? _token.username[0].toUpperCase() : null}
                    </Avatar>
                    <span style={{marginLeft: '-10px'}}>
                        {(_token) ? _token.username.substr(1) : null}
                    </span>
                </span>);

        const userLink = (<MenuItem primaryText="Users" containerElement={<Link to="/users"/>} rightIcon={<i style={icon} className="fa fa-users"/>} />);
    
        return (<div style={{color: 'white'}}>
            {(_token) ? loggedUser : null}
            <IconMenu iconButtonElement={<IconButton iconClassName="fa fa-bars"></IconButton>} targetOrigin={{horizontal: 'right', vertical: 'top'}} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                {(_token.role === 'ADMIN') ? userLink : null}
                <MenuItem onClick={this.logout.bind(this)} primaryText="Sign out" rightIcon={<i style={icon} className="fa fa-sign-out"/>}/>
            </IconMenu>
        </div>);
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
                            iconElementRight={<AppBarMenu/>}
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
            <Route path="/users" component={UserList}/>
            <Route path="*" component={PatientSearchPage}/>
        </Route>
    </Router>,
    document.getElementById('root'));