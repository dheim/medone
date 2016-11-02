import React, {Component} from 'react';

import {Link} from 'react-router';

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

    render() {
        return (<div className="prescription-form">
            <h1>Prescription</h1>
            <form>
                <DrugAutoComplete></DrugAutoComplete>
                <DosageSet></DosageSet>

                <RaisedButton label="save" primary={true} type="submit" icon={<i className="fa fa-save" />} />
                <RaisedButton label="cancel" secondary={true} containerElement={<Link to="/" />} />
            </form>
        </div>);
    }
}

export default PrescriptionForm;