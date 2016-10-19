import React, {Component} from 'react';

class DosageSetMorningNoonEveningNight extends Component {

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="dosage-morning-noon-evening-night">
                <div>
                    <label>Morning</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Noon</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Evening</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Night</label>
                    <input type="text"/>
                </div>
            </div>
        );
    }
}

export default DosageSetMorningNoonEveningNight;