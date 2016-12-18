import React, {Component} from 'react';
import Dosage from 'components/patient/Dosage'

class DosageSetMorningNoonEveningNight extends Component {

    constructor(props) {
        super(props);
    }

    handleChange(time, quantity) {
        let disposals = {...this.props.disposals};
        disposals[time] = quantity;
        this.props.onChange(disposals);
    }

    render() {
        return (
            <div className='dosage-morning-noon-evening-night'>
                <Dosage label='Morning' quantity={this.props.disposals.morning} unity={this.props.unity} onChange={(event, value) => this.handleChange('morning', value)}/>
                <Dosage label='Noon' quantity={this.props.disposals.noon} unity={this.props.unity} onChange={(event, value) => this.handleChange('noon', value)}/>
                <Dosage label='Evening' quantity={this.props.disposals.evening} unity={this.props.unity} onChange={(event, value) => this.handleChange('evening', value)}/>
                <Dosage label='Night' quantity={this.props.disposals.night} unity={this.props.unity} onChange={(event, value) => this.handleChange('night', value)}/>
            </div>
        );
    }
}

export default DosageSetMorningNoonEveningNight;