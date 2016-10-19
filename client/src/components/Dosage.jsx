import React, {Component} from 'react';

class Dosage extends Component {

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <div><label>{this.props.label}</label></div>
                <input type="text"/> <span>Pills</span>
            </div>
        );
    }
}

export default Dosage;