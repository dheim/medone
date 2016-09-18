import React, {Component} from 'react';

class Header extends Component {



	render() {
		return (<div id="main-header">
			<div id="header-logo">
				<i className="fa fa-medkit"/>
				<span className="header-logo-text">medONE</span>
			</div>
		</div>);
	}
}

export default Header;