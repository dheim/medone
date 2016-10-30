import React, {Component} from 'react';
import PrescriptionForm from './PrescriptionForm';
import {api} from 'services/api';

class PrescriptionList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        var patientId = this.props.location.query.patientId;
        const prescriptionsResponse = await api.get(`prescription?patientId=${patientId}`);
        this.setState({
            patientId: patientId,
            prescriptions: prescriptionsResponse.data.prescriptions,
            showPrescriptionForm: false
        });
    }

    togglePrescriptionForm = () => {
        this.setState({
            showPrescriptionForm: !this.state.showPrescriptionForm
        });
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        if (!this.state.prescriptions) {
            return <div>loading prescriptions...</div>
        } else {
            return (
                <div>
                    <button onClick={this.togglePrescriptionForm}>Add prescription</button>
                        {(() => {
                            if (this.state.showPrescriptionForm) {
                                return (
                                    <div key="prescriptionForm">
                                        <PrescriptionForm patientId="{this.state.patientId}"></PrescriptionForm>
                                    </div>
                                )
                            }
                        })()}
                    <table>
                        <thead>
                        <tr>
                            <th>Drug</th>
                            <th>Dosage scheme</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.prescriptions.map(prescription => {
                            return (
                                <tr key={prescription.id}>
                                    <td>{prescription.drugName}</td>
                                    <td>{prescription.dosageScheme}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default PrescriptionList;