import React, {Component} from 'react';
import DrugAutoComplete from './DrugAutoComplete';

class PrescriptionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     *
     * @returns {XML}
     */
    render(str) {
        return (<div>
            <h1>Prescription</h1>
            <form>
                <DrugAutoComplete></DrugAutoComplete>
            </form>
        </div>);
    }
}

export default PrescriptionForm;