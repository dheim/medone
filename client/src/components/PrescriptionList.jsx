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

    componentDidMount() {
        const patientId = this.props.location.query.patientId;
        this.setState({
            patientId,
            showPrescriptionForm: false
        });

        this.loadPrescriptions(patientId);
    }

    async loadPrescriptions(patientId) {
        const prescriptionsResponse = await
        api.get(`patient/${patientId}/prescriptions`);
        this.setState({
            prescriptions: prescriptionsResponse.data,
        });
    }

    togglePrescriptionForm = () => {
        this.setState({
            showPrescriptionForm: !this.state.showPrescriptionForm
        });
    };

    createDisposalOverview(dosageSet) {
        if (!dosageSet) {
            return '';
        }


        switch (dosageSet.dosageScheme) {
            case 'MorningNoonEveningNight':
                let disposals = dosageSet.disposalsMorningNoonEveningNight;
                return `${disposals.morning || 0}, ${disposals.noon || 0}, ${disposals.evening || 0}, ${disposals.night || 0}`
            case 'SpecificTimes':
                return <ul>
                    {dosageSet.disposalsSpecificTimes.map((disposal, index) => {
                        return <li key={index}>{disposal.time}: {disposal.dosage}</li>
                    })}
                </ul>;
            default:
                return null;
        }
    }

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
                                    <PrescriptionForm patientId={this.state.patientId}
                                                      onChange={() => this.loadPrescriptions(this.state.patientId)}></PrescriptionForm>
                                </div>
                            )
                        }
                    })()}

                    <Table>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Drug</TableHeaderColumn>
                                <TableHeaderColumn>Dosage scheme</TableHeaderColumn>
                                <TableHeaderColumn>Dosages</TableHeaderColumn>
                                <TableHeaderColumn>Unity</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.prescriptions.map((prescription) => {
                                return <TableRow key={prescription._id}>
                                    <TableRowColumn>{prescription.drugName}</TableRowColumn>
                                    <TableRowColumn>{prescription.dosageSet ? prescription.dosageSet.dosageScheme : ''}</TableRowColumn>
                                    <TableRowColumn>{this.createDisposalOverview(prescription.dosageSet)}</TableRowColumn>
                                    <TableRowColumn>{prescription.unity}</TableRowColumn>
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