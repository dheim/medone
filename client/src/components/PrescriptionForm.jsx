import React, {Component} from 'react';
import {Link} from 'react-router';

import {api} from 'services/api';
import {token} from 'services/token';

import DrugAutoComplete from './DrugAutoComplete';
import DosageSet from './DosageSet';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

class PrescriptionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientId: this.props.patientId,
            error: false,
            errorMessage: ''
        };
    }

    handleChange(field, value) {
        console.log(field);
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
                this.state.disposalSetSpecificTimes.forEach( function (item) {
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
            dosageSet: {
                dosageScheme: this.state.dosageScheme
            }
        };

        if (this.state.dosageScheme === 'MorningNoonEveningNight') {
            prescriptionData.dosageSet.disposalsMorningNoonEveningNight = this.state.disposalSetMorningNoonEveningNight;
        } else if (this.state.dosageScheme === 'SpecificTimes') {
            prescriptionData.dosageSet.disposalsSpecificTimes = this.state.disposalSetSpecificTimes;
        }

        api.post(`patient/${this.state.patientId}/prescriptions/`, JSON.stringify(prescriptionData))
            .then((result) => {
                this.props.actions.close();
                this.props.actions.save();
            });

        this.setState({
            drug: null,
            dosageScheme: null,
            disposalSetMorningNoonEveningNight: null,
            disposalSetSpecificTimes: null
        });

        this.props.onChange();
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

                <DosageSet dosageScheme={this.state.dosageScheme}
                           disposalSetMorningNoonEveningNight={this.state.disposalSetMorningNoonEveningNight}
                           disposalSetSpecificTimes={this.state.disposalSetSpecificTimes}
                           unity={this.state.drug ? this.state.drug.unity : ''}
                           onChange={(field, value) => this.handleChange(field, value)}/>

               <RaisedButton label="save" primary={true} type="submit" icon={<i className="fa fa-save"/>}/>
            </form>
            <Snackbar open={this.state.error} message={this.state.errorMessage} autoHideDuration={2500} onRequestClose={this.resetError.bind(this)} />
        </div>);
    }
}

export default PrescriptionForm;