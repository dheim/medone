import React, {Component} from 'react';
import PatientSearchForm from './PatientSearchForm';
import PatientList from './PatientList';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import {api} from 'services/api';

import TextField from 'material-ui/TextField';

import 'babel-polyfill';

class PatientSearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: []
        }
    }

    search(criteria) {
        this.setState({
            loading: true
        });

        const queryString = this.createQueryString(criteria);
        api.get(`patient?${queryString}`).then((patients) => {
            let actions = { loading: false, patients: [] };
            if (patients.length > 0) {
                actions.patients = patients.slice(0, 100);
            }
            this.setState(actions);
        }).catch( (error) => {
            console.error(error);
        });
    }

    createQueryString(criteria) {
        let parameters = [];
        for (let p in criteria)
            if (criteria.hasOwnProperty(p) && criteria[p]) {
                parameters.push(encodeURIComponent(p) + "=" + encodeURIComponent(criteria[p]));
            }
        return parameters.join("&");
    }

    render() {
        return (
            <div id="patient-search">
                <PatientSearchForm search={(criteria) => this.search(criteria)} />
                {this.state.loading ? <div className="patient-search__loading"><CircularProgress size={80} thickness={5}/></div> : null}

                {!this.state.loading ? <PatientList patients={this.state.patients}/> : null}
            </div>
        )
    }
}

export default PatientSearchPage;