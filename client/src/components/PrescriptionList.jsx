import React, {Component} from 'react';
import PrescriptionForm from './PrescriptionForm';
import {api} from 'services/api';

import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class PrescriptionList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const patientId = this.props.location.query.patientId;
        const prescriptionsResponse = await api.get(`patient/${patientId}/prescriptions`);
        this.setState({
            patientId,
            prescriptions: prescriptionsResponse.data,
            showPrescriptionForm: false
        });
    }

    togglePrescriptionForm = () => {
        this.setState({
            showPrescriptionForm: !this.state.showPrescriptionForm
        });
    };

    render() {
        if (!this.state.prescriptions) {
            return (<CircularProgress size={80} thickness={5}/>);
        } else {
            return (
                <div>

                    <RaisedButton
                        onClick={this.togglePrescriptionForm}
                        label="Add prescription"
                        backgroundColor="#a4c639"/>

                    {(() => {
                        if (this.state.showPrescriptionForm) {
                            return (
                                <div key="prescriptionForm">
                                    <PrescriptionForm patientId={this.state.patientId}></PrescriptionForm>
                                </div>
                            )
                        }
                    })()}

                    <Table>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Drug</TableHeaderColumn>
                                <TableHeaderColumn>Dosage scheme</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.prescriptions.map((prescription) => {
                                return <TableRow key={prescription._id}>
                                    <TableRowColumn>{prescription.drugName}</TableRowColumn>
                                    <TableRowColumn>{prescription.dosageScheme}</TableRowColumn>
                                </TableRow>
                            })};
                        </TableBody>
                    </Table>

                </div>
            )
        }
    }
}

export default PrescriptionList;