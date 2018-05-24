import 'core-js/fn/object/assign';
import "./../styles/main.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import PacmanApp from './pacmanApp.jsx';

const rootEl = document.getElementById('app-container');

ReactDOM.render(<PacmanApp/>, rootEl);
