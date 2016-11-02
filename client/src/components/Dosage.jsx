import React, {Component} from 'react';

import TextField from 'material-ui/TextField';

class Dosage extends Component {

    render() {
        return (
            <div>
                <TextField type="number" name="pills" floatingLabelText={this.props.label} />
            </div>
        );
    }
}

export default Dosage;