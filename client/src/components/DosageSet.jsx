import React, {Component} from 'react';
import DosageSetMorningNoonEveningNight from './DosageSetMorningNoonEveningNight'
import DosageSetSpecificTimes from './DosageSetSpecificTimes'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DosageSet extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    updateDosageScheme(event, key, dosageScheme) {
        this.props.onChange(this.createDosageSet(dosageScheme, this.state.disposalsMorningNoonEveningNight,
            this.state.disposalsSpecificTimes));

        this.setState({
            dosageScheme: dosageScheme
        });
    }

    updateDisposals(disposals) {
        if (this.state.dosageScheme === "MorningNoonEveningNight") {
            this.setState({
                disposalsMorningNoonEveningNight: disposals
            });

            this.props.onChange(this.createDosageSet(this.state.dosageScheme, disposals, null));

        }

        if (this.state.dosageScheme === "SpecificTimes") {
            this.setState({
                disposalsSpecificTimes: disposals
            });

            this.props.onChange(this.createDosageSet(this.state.dosageScheme, null, disposals));
        }
    }

    createDosageSet(dosageScheme, disposalsMorningNoonEveningNight, disposalsSpecificTimes) {
        return {
            dosageScheme,
            disposalsMorningNoonEveningNight,
            disposalsSpecificTimes
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

                {this.state.dosageScheme === 'MorningNoonEveningNight' ?
                    <DosageSetMorningNoonEveningNight unity={this.props.unity} onChange={this.updateDisposals.bind(this)}/> : null
                }

                {this.state.dosageScheme === 'SpecificTimes' ?
                    <DosageSetSpecificTimes unity={this.props.unity} onChange={this.updateDisposals.bind(this)}/> : null
                }
            </div>
        );
    }
}

export default DosageSet;