import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';

class AutoComplete extends Component {

    /**
     *
     * @returns {XML}
     */
    render() {
        let spinner = this.props.spinnerVisible? <i className="fa fa-spinner fa-spin fa-fw"></i> : '';


        return (
            <div className="autocomplete-container">
                <Autosuggest suggestions={this.props.suggestions}
                             onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
                             onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
                             getSuggestionValue={this.props.getSuggestionValue}
                             renderSuggestion={this.props.renderSuggestion}
                             inputProps={this.props.inputProps}/>
                <div className="autocomplete-side-area">
                    <span onClick={this.props.clearInput}><i className="fa fa-times"/></span>
                    <span>{spinner}</span>
                </div>
            </div>
        );
    }

}

export default AutoComplete;