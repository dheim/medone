import React, {Component} from 'react';
import PrescriptionForm from './PrescriptionForm';
import {api} from 'services/api';
import {token} from 'services/token';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
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
                return `${disposals.morning || 0}, ${disposals.noon || 0}, ${disposals.evening || 0}, ${disposals.night || 0}`;
            case 'SpecificTimes':
                return <ul className="prescriptions-specific-times">
                    {dosageSet.disposalsSpecificTimes.map((disposal, index) => {
                        let time = this.getFormattedTime(disposal.time);
                        return <li key={index}>{time}: {disposal.dosage}</li>
                    })}
                </ul>;
            default:
                return null;
        }
    }

    createDateRange(from, to) {
        if (!to) {
            return 'from ' + moment(from).format('DD.MM.YYYY');
        } else {
            return moment(from).format('DD.MM.YYYY') + ' - ' + moment(to).format('DD.MM.YYYY');
        }
    }

    getFormattedTime(timeString) {
        if (moment(timeString, 'H:m').isValid()) {
            return moment(timeString, 'H:m').format('HH:mm');
        } else {
            return timeString;
        }
    }

    getDosageSchemeLabel(dosageScheme) {
        switch (dosageScheme) {
            case 'MorningNoonEveningNight' :
                return "morning, noon, evening, night";
            case 'SpecificTimes' :
                return "specific times";
            default :
                return 'unknown';
        }
    }

    showSnack() {
        const timeout = 2500;
        this.setState({snack: true});

        window.setTimeout(() => {
            this.setState({snack: false});
        }, timeout);
    }

    render() {
        const actions = [
            <RaisedButton label="save" id="form-submit" primary={true} icon={<i className="fa fa-save"/>}/>,
            <RaisedButton label="cancel" secondary={true} onClick={this.togglePrescriptionForm}/>
        ];

        const _token = token.get();

        if (!this.state.prescriptions) {
            return (<CircularProgress size={80} thickness={5}/>);
        } else {
            return (
                <div>

                    {(_token.role !== 'NURSE') ? (<div>

                        <FloatingActionButton onClick={this.togglePrescriptionForm} style={{position: 'fixed', right: '41px', bottom: '67px'}}>
                            <i className="fa fa-plus"/>
                        </FloatingActionButton>

                        <Dialog title="Add prescription"
                                autoScrollBodyContent={true}
                                onRequestClose={this.togglePrescriptionForm}
                                actions={actions}
                                open={this.state.showPrescriptionForm}>
                            <PrescriptionForm patientId={this.state.patientId}
                                              actions={{
                                                  close: this.togglePrescriptionForm,
                                                  save: this.showSnack.bind(this)
                                              }}
                                              onChange={() => this.loadPrescriptions(this.state.patientId)}/>
                        </Dialog>
                    </div>) : null}

                    {(this.state.prescriptions.length === 0) ? (<div>No prescriptions available</div>) : (<Table>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Drug</TableHeaderColumn>
                                <TableHeaderColumn>Dosage scheme</TableHeaderColumn>
                                <TableHeaderColumn>Dosages</TableHeaderColumn>
                                <TableHeaderColumn>Unity</TableHeaderColumn>
                                <TableHeaderColumn>Date Range</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.prescriptions.map((prescription) => {
                                return <TableRow key={prescription._id}>
                                    <TableRowColumn>{prescription.drugName}</TableRowColumn>
                                    <TableRowColumn>{prescription.dosageSet ? this.getDosageSchemeLabel(prescription.dosageSet.dosageScheme) : ''}</TableRowColumn>
                                    <TableRowColumn>{this.createDisposalOverview(prescription.dosageSet)}</TableRowColumn>
                                    <TableRowColumn>{prescription.unity}</TableRowColumn>
§                                    <TableRowColumn>{this.createDateRange(prescription.from, prescription.to)}</TableRowColumn>
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