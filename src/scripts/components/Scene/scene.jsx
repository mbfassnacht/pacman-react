import React from 'react';
import ReactDOM from 'react-dom';
import Pacman from '../Pacman/pacman.jsx';
import Ghost from '../Ghost/ghost.jsx';

class Scene extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="scene">
				<Pacman ref="pacman"></Pacman>
				<Ghost color="red" ref="ghost1"></Ghost>
				<Ghost color="green" ref="ghost2"></Ghost>
				<Ghost color="blue" ref="ghost3"></Ghost>
				<Ghost color="orange" ref="ghost5"></Ghost>
			</div>
		);
	}
}

Scene.defaultProps = {

};

export default Scene;
