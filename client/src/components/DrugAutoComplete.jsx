import React, {Component} from 'react';
import {api} from 'services/api';
import AutoComplete from './AutoComplete';

const renderSuggestion = suggestion => (
    <div>
        {suggestion.preparation_denomination}
    </div>
);

class DrugAutoComplete extends Component {

    constructor() {
        super();

        this.state = {
            suggestions: [],
            isLoading: false
        };

        this.lastRequestId = null;
    }

    updateSuggestions(value) {
        var searchTerm = value.trim();

        if (searchTerm && searchTerm.length > 1) {
            this.loadSuggestions(searchTerm);
        } else {
            this.clearSuggestions();
        }
    }

    loadSuggestions(searchTerm) {
        // Cancel the previous request
        if (this.lastRequestId !== null) {
            clearTimeout(this.lastRequestId);
        }

        this.setState({
            isLoading: true
        });

        this.lastRequestId = api.get(`drug?denominationOrIngredient=${searchTerm}`).then(drugs => {
                this.setState({
                    isLoading: false,
                    suggestions: drugs
                })
            }
        );
    }

    clearSuggestions() {
        this.setState({
            suggestions: []
        });
    }

    getSuggestionValue = (drug) => {
        this.props.onChange('drug', drug);
        return drug.preparation_denomination;
    };

    onChange = (event, {newValue}) => {
        this.props.onChange('searchTerm', newValue);
        event.stopPropagation();
    };

    onSuggestionsFetchRequested({value}) {
        this.updateSuggestions(value);
    }

    onSuggestionsClearRequested() {
        this.clearSuggestions();
    }

    clearInput = () => {
        this.props.onChange('searchTerm', '');
    };

    render() {
        const {suggestions, isLoading} = this.state;

        // Autosuggest will pass through all these props to the input element.
        const inputProps = {
            placeholder: 'drug or ingredient',
            value: this.props.searchTerm,
            onChange: this.onChange
        };

        return (<AutoComplete suggestions={suggestions}
                              onSuggestionsFetchRequested={(searchTerm) => this.onSuggestionsFetchRequested(searchTerm)}
                              onSuggestionsClearRequested={() => this.onSuggestionsClearRequested()}
                              getSuggestionValue={this.getSuggestionValue}
                              renderSuggestion={renderSuggestion}
                              inputProps={inputProps}
                              clearInput={this.clearInput}
                              spinnerVisible={isLoading}
            />
        );
    }
}

export default DrugAutoComplete;