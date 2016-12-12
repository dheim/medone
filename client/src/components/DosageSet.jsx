import React, {Component} from 'react';
import DosageSetMorningNoonEveningNight from './DosageSetMorningNoonEveningNight'
import DosageSetSpecificTimes from './DosageSetSpecificTimes'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DosageSet extends Component {

    constructor(props) {
        super(props);
    }

    handleChange(field, value) {
        this.props.onChange(field, value);
    }

    render() {
        return (
            <div className="dosage-set">

                <SelectField
                    value={this.props.dosageScheme}
                    floatingLabelText="Dosage schema *"
                    onChange={(event, key, dosageScheme) => this.handleChange('dosageScheme', dosageScheme)}>
                    <MenuItem value="MorningNoonEveningNight" primaryText="Morning, Noon, Evening, Night"/>
                    <MenuItem value="SpecificTimes" primaryText="Specific times"/>
                </SelectField>

                {this.props.dosageScheme === 'MorningNoonEveningNight' ?
                    <DosageSetMorningNoonEveningNight
                        disposals={this.props.disposalSetMorningNoonEveningNight || {}}
                        unity={this.props.unity}
                        onChange={(disposalSet) => this.handleChange('disposalSetMorningNoonEveningNight', disposalSet)}/> : null
                }

                {this.props.dosageScheme === 'SpecificTimes' ?
                    <DosageSetSpecificTimes
                        disposals={this.props.disposalSetSpecificTimes || [{}]}
                        unity={this.props.unity}
                        onChange={(disposalSet) => this.handleChange('disposalSetSpecificTimes', disposalSet)}/> : null
                }
            </div>
        );
    }
}

export default DosageSet;