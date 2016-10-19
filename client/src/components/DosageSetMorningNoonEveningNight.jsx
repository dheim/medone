import React, {Component} from 'react';
import Dosage from './Dosage'

class DosageSetMorningNoonEveningNight extends Component {

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="dosage-morning-noon-evening-night">
               <Dosage label="Morning"/>
               <Dosage label="Noon"/>
               <Dosage label="Evening"/>
               <Dosage label="Night"/>
            </div>
        );
    }
}

export default DosageSetMorningNoonEveningNight;