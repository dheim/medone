import React, {Component} from 'react';

export class Gender extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const gender = (this.props.gender === 'f') ? 'female' : 'male';
		return <i title={this.props.gender} className={`fa fa-${gender}`} />
	}
}

export class RadioGroup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div>
			{this.props.options.map( (option, index) => {
				return (<label key={index}>
					<input name={this.props.name} value={option} defaultChecked={option == this.props.selected} type="radio" />
					<Gender gender={option} />
				</label>);
			})}
		</div>);
	}
};