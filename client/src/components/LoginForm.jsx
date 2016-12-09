import React, {Component} from 'react';
import { withRouter } from 'react-router'
import {api} from 'services/api';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class LoginForm extends Component {

    constructor() {
        super();
        this.state = {
            loginFailed: false
        };
    }

    login(event) {
        event.preventDefault();

        api.post('authentication/', JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })).then((response) => {
            if (!response.ok) {
                this.setState({loginFailed: true});
                return;
            }

            response.json().then((body) => {
                localStorage.setItem('token', body.token);
                this.props.router.push('/patientsearch');
            });

        }).catch((err) => {
            this.setState({loginFailed: true});
        });
    }

    updateUsername(event) {
        this.setState({username: event.target.value});
    }

    updatePassword(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={(event) => this.login(event)}>
                    <TextField type="text" name="username" floatingLabelText="username"
                               onChange={(event) => this.updateUsername(event)}/>
                    <TextField type="password" name="password" floatingLabelText="password"
                               onChange={(event) => this.updatePassword(event)}/>
                    <RaisedButton label="submit" primary={true} type="submit"/>
                    {this.state.loginFailed ? <div>Wrong username or password</div> : null}
                </form>
            </div>
        )
    }

}

export default withRouter(LoginForm);