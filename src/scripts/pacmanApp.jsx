import React from 'react';
import Scene from './components/Scene/scene.jsx';
import Header from './components/Header/header.jsx';

class PacmanApp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pacman-app">
                <Header></Header>
                <Scene></Scene>
            </div>
        );
    }
}

PacmanApp.defaultProps = {

};

export default PacmanApp;
