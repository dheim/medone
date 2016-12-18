import React, {Component} from 'react';
import {api} from 'services/api';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

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
                floatingLabelText="Drug or ingredient *"
                autoComplete="off"
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