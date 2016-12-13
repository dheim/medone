import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

class PatientSearchForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            extendedSearch: false
        };
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
            search: this.state.search,
            pid: this.state.pid,
            surname: this.state.surname,
            givenName: this.state.givenName,
            birthday: this.state.birthday,
            gender: this.state.gender
        });
    }

    toggleExtendedSearch() {
        const result = !this.state.extendedSearch;
        let actions = {
            extendedSearch: result
        };

        // remove the catch-all search-input, when the extended search gets toggled
        if (result === true) {
            actions.search = undefined;
        }

        this.setState(actions);
    }

    render() {

        const extendedSearch = (<div className="patient-search__form--extended">
            <TextField type="text" fullWidth={true} name="pid" floatingLabelText="patient id" onChange={(event) => this.handleChange(event)}/>
            <TextField type="text" fullWidth={true} name="surname" floatingLabelText="surname" onChange={(event) => this.handleChange(event)}/>
            <TextField type="text" fullWidth={true} name="givenName" floatingLabelText="given name" onChange={(event) => this.handleChange(event)}/>
            <TextField type="text" fullWidth={true} name="birthday" floatingLabelText="birthday" onChange={(event) => this.handleChange(event)}/>
            <SelectField name="gender" floatingLabelText="gender" value={this.state.gender} onChange={(event, key, value) => this.handleGenderChange(value)}>
                <MenuItem value={''} primaryText="any"/>
                <MenuItem value={'m'} primaryText="male"/>
                <MenuItem value={'f'} primaryText="female"/>
            </SelectField>
            <br/>
            <div className="patient-search__form--extended actions">
                <RaisedButton label="search" primary={true} type="submit" />
                <IconButton onClick={this.toggleExtendedSearch.bind(this)} tooltip="Expand" iconClassName="fa fa-caret-square-o-up"/>
            </div>
        </div>);

        const simpleSearch = (<div className="patient_search__form--simple">
            <div className="patient_search__form--simple movedInput">
                <TextField type="text" name="search" onChange={(event) => this.handleChange(event)} autoFocus={true} floatingLabelText="id, name" />
            </div>
            <RaisedButton label="search" primary={true} type="submit" />
            <IconButton onClick={this.toggleExtendedSearch.bind(this)} tooltip="Expand" iconClassName="fa fa-caret-square-o-down"/>
        </div>);

        return (
            <div>
                <form className="patient-search__form" onSubmit={(event) => this.search(event)} autoComplete="off">
                    {this.state.extendedSearch ? extendedSearch : simpleSearch}
                </form>
            </div>
        )
    }
}

export default PatientSearchForm