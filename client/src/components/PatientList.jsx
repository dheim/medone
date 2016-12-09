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
        return (
            <Table>
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
            </Table>
        );
    }
}

export default PatientList;