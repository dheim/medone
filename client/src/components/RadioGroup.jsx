import React, {Component} from 'react';

export default class RadioGroup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		return (<div>
			{this.props.options.map( (index, option) => {
				return <input key={index} type="radio" />;
			})}
		</div>);
	}
};