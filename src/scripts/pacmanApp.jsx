import React from 'react';
import Scene from './components/Scene/scene.jsx';
import Header from './components/Header/header.jsx';

class PacmanApp extends React.Component {

    constructor(props) {
        super(props);
    }

    increaseValue() {
        this.refs.header.increase();
    }

    gameOver() {
        this.refs.header.gameOver();
    }

    render() {
        return (
            <div className="pacman-app">
                <Header ref="header"></Header>
                <Scene gameOver = {this.gameOver.bind(this)} increase= {this.increaseValue.bind(this)}></Scene>
            </div>
        );
    }
}

PacmanApp.defaultProps = {

};

export default PacmanApp;
