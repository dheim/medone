import React, {Component} from 'react';
import PatientSearchForm from './PatientSearchForm';
import PatientList from './PatientList';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import {api} from 'services/api';

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

        let queryString = this.createQueryString(criteria);

        api.get(`patient?${queryString}`).then((patients) => {
            this.setState({
                patients: patients.slice(0, 100),
                loading: false
            });
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
            <div>
                <PatientSearchForm search={(criteria) => this.search(criteria)}/>
                <Divider/>
                {this.state.loading ? <CircularProgress size={80} thickness={5}/> : null}
                {!this.state.loading ? <PatientList patients={this.state.patients}/> : null}
            </div>
        )
    }
}

export default PatientSearchPage;