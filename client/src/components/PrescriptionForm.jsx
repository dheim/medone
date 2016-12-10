import React, {Component} from 'react';
import {Link} from 'react-router';

import {api} from 'services/api';

import DrugAutoComplete from './DrugAutoComplete';
import DosageSet from './DosageSet';

import RaisedButton from 'material-ui/RaisedButton';

class PrescriptionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientId: this.props.patientId,
            searchTerm: ''
        };
    }

    handleChange(field, value) {
        this.setState({[field]: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.drug) {
            // TODO Form validation
            return;
        }

        this.save();
    }

    save() {
        let prescriptionData = {
            drugDocId: this.state.drug.docid,
            drugName: this.state.drug.preparation_denomination,
            unity: this.state.drug.unity,
            dosageSet: this.state.dosageSet
        };

        api.post(`patient/${this.state.patientId}/prescriptions/`, JSON.stringify(prescriptionData))
            .then((result) => {
                console.log('prescription successfully saved');
            });

        this.setState({
            drug: null,
            searchTerm: ''
        });

        this.props.onChange();
    }

    preventEnterFromSubmitting(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    render() {
        return (<div className="prescription-form">
            <h1>Prescription</h1>
            <form onSubmit={(event) => this.handleSubmit(event)}
                  onKeyPress={(event) => this.preventEnterFromSubmitting(event)}>

                <DrugAutoComplete
                    onChange={(field, value) => this.handleChange(field, value)}
                    drug={this.state.drug}
                    searchTerm={this.state.searchTerm}/>
                <div>Selected drug: {this.state.drug ? this.state.drug.preparation_denomination : ''}</div>

                <DosageSet unity={this.state.drug ? this.state.drug.unity : ''}
                           onChange={(dosageSet) => this.handleChange('dosageSet', dosageSet)}/>

                <RaisedButton label="save" primary={true} type="submit" icon={<i className="fa fa-save"/>}/>
                <RaisedButton label="cancel" secondary={true} containerElement={<Link to="/"/>}/>
            </form>
        </div>);
    }
}

export default PrescriptionForm;