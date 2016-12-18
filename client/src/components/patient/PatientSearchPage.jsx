import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import PatientSearchForm from 'components/patient/PatientSearchForm';
import PatientList from 'components/patient/PatientList';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import {api} from 'services/api';
import {token} from 'services/token';

import TextField from 'material-ui/TextField';

class PatientSearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: null
        }
    }

    componentDidMount() {
        if (!token.isValid()) {
            hashHistory.push('/login');
        }
    }

    store(data) {
        localStorage.setItem('tmpPatients', JSON.stringify(data));
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
            this.store(actions.patients);
            this.setState(actions);
        }).catch( (error) => {
            localStorage.removeItem('tmpPatients');
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
        let patients = this.state.patients;
        let _patients = localStorage.getItem('tmpPatients');
        if (_patients) {
            patients = JSON.parse(_patients);
        }

        return (
            <div id="patient-search">
                <PatientSearchForm search={(criteria) => this.search(criteria)} />
                {this.state.loading ? <div className="patient-search__loading"><CircularProgress size={80} thickness={5}/></div> : null}

                {!this.state.loading ? <PatientList patients={patients}/> : null}
            </div>
        )
    }
}

export default PatientSearchPage;