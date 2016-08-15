import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
    render () {
        return <p> This is medone!</p>;
    }
}

render(<App/>, document.getElementById('app'));