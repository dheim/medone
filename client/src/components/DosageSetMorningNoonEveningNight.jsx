import React, {Component} from 'react';
import Dosage from './Dosage'

class DosageSetMorningNoonEveningNight extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disposals: {}
        };
    }

    handleChange(time, disposal) {
        let disposals = {
            morning: time === 'morning' ? disposal : this.state.disposals.morning,
            noon: time === 'noon' ? disposal : this.state.disposals.noon,
            evening: time === 'evening' ? disposal : this.state.disposals.evening,
            night: time === 'night' ? disposal : this.state.disposals.night
        };

        this.setState({disposals});
        this.props.onChange(disposals);
    }

    render() {
        return (
            <div className="dosage-morning-noon-evening-night">
                <Dosage label="Morning" unity={this.props.unity} onChange={(event, value) => this.handleChange("morning", value)}/>
                <Dosage label="Noon" unity={this.props.unity} onChange={(event, value) => this.handleChange("noon", value)}/>
                <Dosage label="Evening" unity={this.props.unity} onChange={(event, value) => this.handleChange("evening", value)}/>
                <Dosage label="Night" unity={this.props.unity} onChange={(event, value) => this.handleChange("night", value)}/>
            </div>
        );
    }
}

export default DosageSetMorningNoonEveningNight;