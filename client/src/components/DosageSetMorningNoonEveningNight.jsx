import React, {Component} from 'react';
import Dosage from './Dosage'

class DosageSetMorningNoonEveningNight extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dosages: {}
        };
    }

    handleChange(dosage) {
        let dosages = {
            morning: dosage.time == 'morning' ? dosage.quantity : this.state.dosages.morning,
            noon: dosage.time == 'noon' ? dosage.quantity : this.state.dosages.noon,
            evening: dosage.time == 'evening' ? dosage.quantity : this.state.dosages.evening,
            night: dosage.time == 'night' ? dosage.quantity : this.state.dosages.night
        };

        this.setState({dosages});
        this.props.onChange(dosages);
    }

    render() {
        return (
            <div className="dosage-morning-noon-evening-night">
                <Dosage label="Morning" time="morning" onChange={this.handleChange.bind(this)}/>
                <Dosage label="Noon" time="noon" onChange={this.handleChange.bind(this)}/>
                <Dosage label="Evening" time="evening" onChange={this.handleChange.bind(this)}/>
                <Dosage label="Night" time="night" onChange={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

export default DosageSetMorningNoonEveningNight;