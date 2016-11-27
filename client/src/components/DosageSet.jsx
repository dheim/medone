import React, {Component} from 'react';
import DosageSetMorningNoonEveningNight from './DosageSetMorningNoonEveningNight'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DosageSet extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    updateDosageScheme(event, key, payload) {
        let dosageScheme = payload;

        this.props.onChange(this.createDosageSet(dosageScheme, this.state.dosages));

        this.setState({
            dosageScheme: payload
        });
    }

    updateDosages(dosages) {
        this.setState({
            dosages: dosages
        });

        this.props.onChange(this.createDosageSet(this.state.dosageScheme, dosages));
    }

    createDosageSet(dosageScheme, dosages) {
        return {
            dosageScheme,
            dosages
        }
    }

    render() {
        return (
            <div className="dosage-set">

                <SelectField
                    value={this.state.dosageScheme}
                    floatingLabelText="Dosage schema"
                    onChange={this.updateDosageScheme.bind(this)}>
                    <MenuItem value="MorningNoonEveningNight" primaryText="Morning, Noon, Evening, Night"/>
                    <MenuItem value="SpecificTimes" primaryText="Specific times"/>
                </SelectField>

                <DosageSetMorningNoonEveningNight onChange={this.updateDosages.bind(this)}/>
            </div>
        );
    }
}

export default DosageSet;