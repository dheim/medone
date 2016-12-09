import React, {Component} from 'react';
import Dosage from './Dosage'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

class DosageSetSpecificTimes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disposals: [
                {}
            ]
        }
    }

    updateTime(index, time) {
        let updatedDisposals = this.state.disposals.slice();
        updatedDisposals[index].time = time;
        this.setState({disposals: updatedDisposals});
        this.props.onChange(updatedDisposals);
    }

    updateDosage(index, dosage) {
        let updatedDisposals = this.state.disposals.slice();
        updatedDisposals[index].dosage = dosage;
        this.setState({disposals: updatedDisposals});
        this.props.onChange(updatedDisposals);
        console.log(updatedDisposals);
    }

    addDisposal() {
        let updatedDisposals = this.state.disposals.slice();
        updatedDisposals.push({});
        this.setState({disposals: updatedDisposals});
        this.props.onChange(updatedDisposals);
    }

    removeDisposal(index) {
        let updatedDisposals = this.state.disposals.slice();
        updatedDisposals.splice(index, 1);
        this.setState({disposals: updatedDisposals});
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
                    {this.state.disposals.map((dosage, index, allDosages) => {
                        return <TableRow key={index} selectable={false}>
                            <TableRowColumn>
                                <TextField type="text" name={'time' + index} floatingLabelText="Time"
                                           onChange={(event, value) => this.updateTime(index, value)}/>
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