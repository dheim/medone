import React, {Component} from 'react';

import {api} from 'services/api';
import {token} from 'services/token';
import moment from 'moment';

import DrugAutoComplete from 'components/patient/DrugAutoComplete';
import DateRange from 'components/DateRange';
import DosageSet from 'components/patient/DosageSet';
import Snackbar from 'material-ui/Snackbar';

class PrescriptionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientId: this.props.patientId,
            from: new Date(),
            error: false,
            errorMessage: ''
        };
    }

    componentDidMount() {
        this.saveBtn = document.getElementById('form-submit');
        this.saveBtn.addEventListener('click', this.handleSubmit.bind(this));
    }

    componentWillUnmount() {
        this.saveBtn.removeEventListener('click', this.handleSubmit.bind(this));
    }

    handleChange(field, value) {
        this.setState({[field]: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.patientId) {
            this.setState({error: true, errorMessage: 'PatientId is missing'});
            return;
        }

        if (!this.state.drug) {
            this.setState({error: true, errorMessage: 'Please select a drug'});
            return;
        } else if (!this.state.dosageScheme) {
            this.setState({error: true, errorMessage: 'Please set a dosage schema'});
            return
        } else if (this.state.dosageScheme === 'MorningNoonEveningNight') {
            let error = false;
            if (!this.state.disposalSetMorningNoonEveningNight) {
                error = true;
            }

            if (error) {
                this.setState({error: true, errorMessage: 'Please set a dosage'});
                return;
            }

        } else if (this.state.dosageScheme === 'SpecificTimes') {
            let error = false;
            if (!this.state.disposalSetSpecificTimes) {
                error = true;
            } else {
                this.state.disposalSetSpecificTimes.forEach(function (item) {
                    if (!item.time || !item.dosage) {
                        error = true;
                    }
                });
            }

            if (error) {
                this.setState({error: true, errorMessage: 'Please set all times and dosages'});
                return;
            }
        }

        this.save();
    }

    save() {
        let prescriptionData = {
            drugDocId: this.state.drug.docid,
            drugName: this.state.drug.preparation_denomination,
            unity: this.state.drug.unity,
            from: this.toUtcDate(this.state.from),
            to: this.toUtcDate(this.state.to),
            dosageSet: {
                dosageScheme: this.state.dosageScheme
            }
        };

        if (this.state.dosageScheme === 'MorningNoonEveningNight') {
            prescriptionData.dosageSet.disposalsMorningNoonEveningNight = this.state.disposalSetMorningNoonEveningNight;
        } else if (this.state.dosageScheme === 'SpecificTimes') {
            prescriptionData.dosageSet.disposalsSpecificTimes = this.state.disposalSetSpecificTimes;
        }

        api.post(`patient/${this.state.patientId}/prescriptions`, JSON.stringify(prescriptionData))
            .then(() => {
                this.props.actions.close();
                this.props.actions.save();
            });

        this.setState({
            drug: null,
            from: new Date(),
            to: null,
            dosageScheme: null,
            disposalSetMorningNoonEveningNight: null,
            disposalSetSpecificTimes: null
        });

        this.props.onChange();
    }

    toUtcDate(localDate) {
        if (!localDate) {
            return null;
        }

        var utcDate = moment(localDate).utc().subtract(localDate.getTimezoneOffset(), 'm').startOf('day');
        return utcDate.format();
    }

    preventEnterFromSubmitting(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    resetError() {
        this.setState({error: false, errorMessage: ''});
    }

    render() {
        return (<div className="prescription-form">
            <form onSubmit={(event) => this.handleSubmit(event)}
                  onKeyPress={(event) => this.preventEnterFromSubmitting(event)}>

                <DrugAutoComplete onChange={this.handleChange.bind(this)}/>

                <DateRange from={this.state.from}
                           to={this.state.to}
                           onChange={(field, value) => this.handleChange(field, value)}/>

                <DosageSet dosageScheme={this.state.dosageScheme}
                           disposalSetMorningNoonEveningNight={this.state.disposalSetMorningNoonEveningNight}
                           disposalSetSpecificTimes={this.state.disposalSetSpecificTimes}
                           unity={this.state.drug ? this.state.drug.unity : ''}
                           onChange={(field, value) => this.handleChange(field, value)}/>


            </form>
            <Snackbar open={this.state.error} message={this.state.errorMessage} autoHideDuration={2500}
                      onRequestClose={this.resetError.bind(this)}/>
        </div>);
    }
}

export default PrescriptionForm;