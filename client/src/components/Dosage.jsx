import React, {Component} from 'react';

import TextField from 'material-ui/TextField';

class Dosage extends Component {

    render() {
        return (
            <div>
                <TextField type="number" name={this.props.name} floatingLabelText={this.props.label}
                           onChange={(event, value) => this.props.onChange(event, value)}/>
            </div>
        );
    }
}

export default Dosage;