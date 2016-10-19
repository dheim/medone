import React, {Component} from 'react';
import DosageSetMorningNoonEveningNight from './DosageSetMorningNoonEveningNight'


class DosageSet extends Component {

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="dosage-set">
                <select>
                    <option value="MorningNoonEveningNight">Morning, Noon, Evening, Night</option>
                    <option value="SpecificTimes">Specific times</option>
                </select>
                <DosageSetMorningNoonEveningNight/>
            </div>
        );
    }
}

export default DosageSet;