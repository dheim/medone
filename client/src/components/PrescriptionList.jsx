import React, {Component} from 'react';
import PrescriptionForm from './PrescriptionForm';
import {api} from 'services/api';
import {token} from 'services/token';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import moment from 'moment';

class PrescriptionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snack: false
        };
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

                        let time = disposal.time;;
                        if (disposal.time.length > 5) {
                            time = moment(time).format('HH:mm');
                        }

                        return <li key={index}>{time}: {disposal.dosage}</li>
                    })}
                </ul>;
            default:
                return null;
        }
    }

    showSnack() {
        const timeout = 2500;
        this.setState({snack: true});

        window.setTimeout( () => {
            this.setState({snack: false});
        }, timeout);
    }

    render() {
        const actions = [
            <RaisedButton label="cancel" secondary={true} onClick={this.togglePrescriptionForm} />
        ];

        const _token = token.get();

        if (!this.state.prescriptions) {
            return (<CircularProgress size={80} thickness={5}/>);
        } else {
            return (
                <div>

                    {(_token.role !== 'NURSE') ? (<div>
                        <RaisedButton onClick={this.togglePrescriptionForm} label="Add prescription" backgroundColor="#a4c639"/>
                        <Dialog title="Add prescription"
                            autoScrollBodyContent={true}
                            onRequestClose={this.togglePrescriptionForm}
                            actions={actions}
                            open={this.state.showPrescriptionForm}>
                            <PrescriptionForm patientId={this.state.patientId}
                                            actions={{close: this.togglePrescriptionForm, save: this.showSnack.bind(this)}}
                                            onChange={() => this.loadPrescriptions(this.state.patientId)}/>
                        </Dialog>
                    </div>) : null}

                    {(this.state.prescriptions.length === 0) ? (<div>No described prescriptions</div>) : (<Table>
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
                    </Table>)}

                    <Snackbar
                        open={this.state.snack}
                        message="Prescription added!"/>

                </div>
            )
        }
    }
}

export default PrescriptionList;