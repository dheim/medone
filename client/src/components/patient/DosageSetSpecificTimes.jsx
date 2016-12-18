import React, {Component} from 'react';
import Dosage from 'components/patient/Dosage'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import TimePicker from 'material-ui/TimePicker';

class DosageSetSpecificTimes extends Component {

    constructor(props) {
        super(props);
    }

    updateTime(index, time) {
        let updatedDisposals = this.props.disposals.slice();
        updatedDisposals[index].time = time.getHours() + ':' + time.getMinutes();
        this.props.onChange(updatedDisposals);
    }

    updateDosage(index, dosage) {
        let updatedDisposals = this.props.disposals.slice();
        updatedDisposals[index].dosage = dosage;
        this.props.onChange(updatedDisposals);
    }

    addDisposal() {
        let updatedDisposals = this.props.disposals.slice();
        updatedDisposals.push({});
        this.props.onChange(updatedDisposals);
    }

    removeDisposal(index) {
        let updatedDisposals = this.props.disposals.slice();
        updatedDisposals.splice(index, 1);
        this.props.onChange(updatedDisposals);
    }

    render() {
        return (
            <Table>
                <TableHeader displaySelectAll={false} className="invisible">
                    <TableRow>
                        <TableHeaderColumn>Time</TableHeaderColumn>
                        <TableHeaderColumn>Dosage</TableHeaderColumn>
                        <TableHeaderColumn>Action</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.disposals.map((dosage, index, allDosages) => {
                        return <TableRow key={index} selectable={false}>
                            <TableRowColumn>
                                <TimePicker format="24hr" name={'time' + index} hintText="Time" onChange={(event, value) => this.updateTime(index, value)}/>
                            </TableRowColumn>
                            <TableRowColumn>
                                <Dosage name={'dosage' + index} label='Dosage' unity={this.props.unity}
                                        onChange={(event, value) => this.updateDosage(index, value)}/>
                            </TableRowColumn>
                            <TableRowColumn>
                                {allDosages.length > 1 ?
                                    <IconButton
                                        iconClassName="fa fa-trash" tooltip="remove dosage"
                                        tooltipPosition="top-center" onClick={() => this.removeDisposal(index)}
                                    /> : null
                                }
                                {index === allDosages.length - 1 ?
                                    <IconButton
                                        iconClassName="fa fa-plus" tooltip="add new dosage"
                                        tooltipPosition="top-center" onClick={() => this.addDisposal()}
                                    /> : null
                                }
                            </TableRowColumn>
                        </TableRow>
                    })};}
                </TableBody>
            </Table>
        );
    }
}

export default DosageSetSpecificTimes;