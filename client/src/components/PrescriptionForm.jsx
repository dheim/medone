import React, {Component} from 'react';
import DrugAutoComplete from './DrugAutoComplete';
import DosageSet from './DosageSet';

class PrescriptionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     *
     * @returns {XML}
     */
    render() {
        return (<div className="prescription-form">
            <h1>Prescription</h1>
            <form>
                <DrugAutoComplete></DrugAutoComplete>
                <DosageSet></DosageSet>
                <button>Cancel</button>
                <button type="submit">Save</button>
            </form>
        </div>);
    }
}

export default PrescriptionForm;