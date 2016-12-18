import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import 'intl'
import 'intl/locale-data/jsonp/de';
import 'intl/locale-data/jsonp/de-CH';

let DateTimeFormat = global.Intl.DateTimeFormat;

class DateRange extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <DatePicker
                    onChange={(event, date) => this.props.onChange('from', date)}
                    autoOk={true}
                    floatingLabelText="from *"
                    value={this.props.from}
                    DateTimeFormat={DateTimeFormat}
                    locale="de-CH"
                    className="date-picker-inline-block"/>

                <DatePicker
                    onChange={(event, date) => this.props.onChange('to', date)}
                    autoOk={true}
                    floatingLabelText="to"
                    value={this.props.to}
                    DateTimeFormat={DateTimeFormat}
                    locale="de-CH"
                    className="date-picker-inline-block"/>
            </div>
        )
    }
}

export default DateRange;