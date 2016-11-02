import React, {Component} from 'react';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default class RadioGroup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div>
			{this.props.options.map( (index, option) => {
				return (<RadioButton key={index}/>);
			})}
		</div>);
	}
};