import React, {Component} from 'react';
import {api} from 'services/api';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

const renderSuggestion = suggestion => (
    <div>
        {suggestion.preparation_denomination}
    </div>
);

class __DrugAutoComplete extends Component {

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

function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

class DrugAutoComplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drugs: []
        };

        this.search = debounce(this.search, 450);
    }

    search(proxy, searchTerm) {
        if (searchTerm) {
            api.get(`drug?denominationOrIngredient=${searchTerm}`)
                .then(drugs => {
                    this.setState({drugs: drugs.slice(0, 7)});
                });
        } else {
            this.setState({drugs: []});
        }
    }

    selectDrug(drug) {
        document.getElementById('inputDrugSelect').value = drug.preparation_denomination;
        this.setState({drugs: []});
        this.props.onChange('drug', drug);
    }

    render() {
        return (<div>
            <TextField
                id="inputDrugSelect"
                autoFocus={true}
                onChange={this.search.bind(this)}
                floatingLabelText="drug or ingredient"
                fullWidth={true}/>

            <List>
                {this.state.drugs.map(drug => {
                    return <ListItem
                                onClick={() => this.selectDrug(drug)}
                                key={drug.docid}
                                primaryText={drug.preparation_denomination} />;
                })}
            </List>

        </div>);
    }

}

export default DrugAutoComplete;