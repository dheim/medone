import React from 'react';
import {shallow, mount, render} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dosage from '../src/components/Dosage';

const dosageMarkup =
    <MuiThemeProvider>
        <Dosage name="evening" label="evening" unity="Ampullen" quantity="2" onChange={() => {}}/>
    </MuiThemeProvider>;

describe("A dosage", function () {
    it("should contain the provided unity", function () {
        const wrapper = mount(dosageMarkup);
        var unityWrapper = wrapper.find(Dosage).find('span').first();
        expect(unityWrapper.text()).toBe('Ampullen')
    });
});

