import React, {Component} from 'react';

import {api} from 'services/api';

import {Link} from 'react-router';
import {Gender} from 'components/VisualHelpers';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';

import 'babel-polyfill';

class PatientList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const list = (<Table>
            <TableHeader displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>#</TableHeaderColumn>
                    <TableHeaderColumn>gender</TableHeaderColumn>
                    <TableHeaderColumn>name</TableHeaderColumn>
                    <TableHeaderColumn>surname</TableHeaderColumn>
                    <TableHeaderColumn>date of birth</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                { this.props.patients.map((patient) => {
                    return (<TableRow key={patient.id}>
                        <TableRowColumn>{patient.id}</TableRowColumn>
                        <TableRowColumn><Gender gender={patient.gender}/></TableRowColumn>
                        <TableRowColumn>{patient.givenname}</TableRowColumn>
                        <TableRowColumn>{patient.surname}</TableRowColumn>
                        <TableRowColumn>{patient.birthday}</TableRowColumn>
                        <TableRowColumn>
                            <IconButton
                                iconClassName="fa fa-id-card-o" tooltip="patient detail"
                                tooltipPosition="top-center"
                                containerElement={<Link to={`/patient/${patient.id}`}/>}/>
                            <IconButton
                                iconClassName="fa fa-medkit" tooltip="prescriptions"
                                tooltipPosition="top-center"
                                containerElement={<Link to={`/prescriptions?patientId=${patient.id}`}/>}/>
                        </TableRowColumn>
                    </TableRow>);
                })};
            </TableBody>
        </Table>);

        if (this.props.data && this.props.data.state === 'initial') {
            return <div>please use the provided search-field.</div>;
        } else if (this.props.patients.length === 0) {
            return list;
        } else {
            return <div>no results</div>;
        }

        return (this.props.patients.length) ? list : <div>no results</div>;
    }
}

export default PatientList;