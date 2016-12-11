import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


class PatientSearchForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleGenderChange(value) {
        this.setState({gender: value});
    }

    search(event) {
        event.preventDefault();
        this.props.search({
            pid: this.state.pid,
            surname: this.state.surname,
            givenName: this.state.givenName,
            birthday: this.state.birthday,
            gender: this.state.gender
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.search(event)}>
                    <TextField type="text" name="pid" floatingLabelText="patient id"
                               onChange={(event) => this.handleChange(event)}/>
                    <TextField type="text" name="surname" floatingLabelText="surname"
                               onChange={(event) => this.handleChange(event)}/>
                    <TextField type="text" name="givenName" floatingLabelText="given name"
                               onChange={(event) => this.handleChange(event)}/>
                    <TextField type="text" name="birthday" floatingLabelText="birthday"
                               onChange={(event) => this.handleChange(event)}/>
                    <SelectField
                        name="gender" floatingLabelText="gender" value={this.state.gender}
                        onChange={(event, key, value) => this.handleGenderChange(value)}>
                        <MenuItem value={''} primaryText="any"/>
                        <MenuItem value={'m'} primaryText="male"/>
                        <MenuItem value={'f'} primaryText="female"/>
                    </SelectField>
                    <RaisedButton label="search" primary={true} type="submit"/>
                </form>
            </div>
        )
    }
}

export default PatientSearchForm