import React, {Component} from 'react';

import TextField from 'material-ui/TextField';

class Dosage extends Component {

    handleChange(event) {
        this.props.onChange({
            time: this.props.time,
            quantity: event.target.value
        })
    }

    render() {
        return (
            <div>
                <TextField type="number" floatingLabelText={this.props.label}
                           onChange={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

export default Dosage;