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
            patientId: this.props.patientId
        };
    }

    save(event) {
        event.preventDefault();

        if (!this.state.drug) {
            // TODO Form validation
            return;
        }

        let prescriptionData = {
            drugDocId: this.state.drug.docid,
            drugName: this.state.drug.preparation_denomination,
            dosageSet: this.state.dosageSet
        };

        api.post(`patient/${this.state.patientId}/prescriptions/`, JSON.stringify(prescriptionData))
            .then((result) => {
                console.log('prescription successfully saved');
            });
    }

    updateSelectedDrug(drug) {
        this.setState({
            drug: drug
        })
    }

    updateDosageSet(dosageSet) {
        this.setState({
            dosageSet: dosageSet
        })
    }

    render() {
        return (<div className="prescription-form">
            <h1>Prescription</h1>
            <form onSubmit={this.save.bind(this) }>

                <DrugAutoComplete onDrugSelected={this.updateSelectedDrug.bind(this)}></DrugAutoComplete>
                <div>Selected
                    drug: {this.state.drug ? this.state.drug.preparation_denomination : ''}</div>

                <DosageSet onChange={this.updateDosageSet.bind(this)}></DosageSet>

                <RaisedButton label="save" primary={true} type="submit" icon={<i className="fa fa-save"/>}/>
                <RaisedButton label="cancel" secondary={true} containerElement={<Link to="/"/>}/>
            </form>
        </div>);
    }
}

export default PrescriptionForm;