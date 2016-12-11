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
            <div id="login">
                <h1>Login</h1>
                <form id="login__form" onSubmit={(event) => this.login(event)} autoComplete="off">
                    <div>
                        <TextField type="text" name="username" className="login__input" floatingLabelText="Username" autoFocus={true} onChange={(event) => this.updateUsername(event)}/>
                    </div>
                    <div>
                        <TextField type="password" name="password" className="login__input"floatingLabelText="Password"onChange={(event) => this.updatePassword(event)}/>
                    </div>
                    <div>
                        <RaisedButton label="Login" primary={true} type="submit"/>
                        {this.state.loginFailed ? <div className="login__error">Wrong username or password</div> : null}
                    </div>
                </form>
            </div>
        )
    }

}

export default withRouter(LoginForm);