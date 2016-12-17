import React, {Component} from 'react';
import {render} from 'react-dom';

import UserForm from 'components/user/UserForm';

import {api} from 'services/api';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showForm: false,
            success: false
        };
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers() {
        api.get('user')
            .then( users => {
                this.setState({users});
            });
    }

    toggleForm() {
        this.setState({
            showForm: !this.state.showForm
        });
    }

    showSuccess() {
        this.setState({success: true});

        window.setTimeout(() => {
            this.setState({success: false});
        }, 2500);
    }

	render() {
        const actions = [
            <RaisedButton label="Save" id="form-submit" primary={true} onClick={this.handleSubmit}/>,
            <RaisedButton label="cancel" secondary={true} onClick={this.toggleForm.bind(this)}/>
        ];

		return (<div>
            <Table>
			<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>#</TableHeaderColumn>
                    <TableHeaderColumn>username</TableHeaderColumn>
                    <TableHeaderColumn>name</TableHeaderColumn>
                    <TableHeaderColumn>surname</TableHeaderColumn>
                    <TableHeaderColumn>role</TableHeaderColumn>
                    <TableHeaderColumn>&nbsp;</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                { this.state.users.map((user) => {
                    return (<TableRow key={user._id}>
                        <TableRowColumn>{user._id}</TableRowColumn>
                        <TableRowColumn>{user.username}</TableRowColumn>
                        <TableRowColumn>{user.lastName}</TableRowColumn>
                        <TableRowColumn>{user.firstName}</TableRowColumn>
                        <TableRowColumn>{user.role}</TableRowColumn>
                    </TableRow>);
                })};
            </TableBody>
    		</Table>

            <Dialog title="Add user"
                    autoScrollBodyContent={true}
                    onRequestClose={this.toggleForm.bind(this)}
                    actions={actions}
                    open={this.state.showForm}>
                    <UserForm onChange={this.loadUsers.bind(this)} actions={{
                        close: this.toggleForm.bind(this),
                        save: this.showSuccess.bind(this)
                    }}/>
            </Dialog>

            <FloatingActionButton onClick={this.toggleForm.bind(this)} style={{position: 'fixed', right: '41px', bottom: '67px'}}>
                <i className="fa fa-plus"/>
            </FloatingActionButton>

            <Snackbar open={this.state.success} message="User added!"/>
        </div>);
	}
}

export default UserList;