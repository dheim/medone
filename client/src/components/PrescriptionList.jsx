import React, {Component} from 'react';
import {api} from 'services/api';

class PrescriptionList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const prescriptions = await api.get(`prescription?patientId=${this.props.location.query.patientId}`);
        this.setState({
            prescriptions: prescriptions.data[0].prescriptions
        });
    }

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
                    <table>
                        <thead>
                        <tr>
                            <th>Medikament</th>
                            <th>Dosierschema</th>
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