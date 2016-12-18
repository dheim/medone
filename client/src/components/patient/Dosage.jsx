import React, {Component} from 'react';

import TextField from 'material-ui/TextField';

class Dosage extends Component {

    render() {
        return (
            <div>
                <TextField type="number" name={this.props.name} min="0" max="1000" floatingLabelText={this.props.label}
                					 style={{position: 'relative', top: '-12px'}}
                           onChange={(event, value) => this.props.onChange(event, value)}/>
                <span>{this.props.unity}</span>
            </div>
        );
    }
}

export default Dosage;