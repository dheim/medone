import React, {Component} from 'react';
import DosageSetMorningNoonEveningNight from './DosageSetMorningNoonEveningNight'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DosageSet extends Component {

    render() {
        return (
            <div className="dosage-set">

                <SelectField
                    floatingLabelText="Frequency"
                    onChange={this.handleChange}>
                    <MenuItem value="MorningNoonEveningNight" primaryText="Morning, Noon, Evening, Night" />
                    <MenuItem value="SpecificTimes" primaryText="Specific times" />
                </SelectField>

                <DosageSetMorningNoonEveningNight/>
            </div>
        );
    }
}

export default DosageSet;