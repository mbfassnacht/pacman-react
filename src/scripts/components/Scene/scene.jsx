import React from 'react';
import ReactDOM from 'react-dom';
import Pacman from '../Pacman/pacman.jsx';
import Ghost from '../Ghost/ghost.jsx';
import Food from '../Food/food.jsx';

class Scene extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
		this.crashed = false;
		this.intervalCrash = setInterval(this.lookForCrash.bind(this), 100);
		this.intervalFood = setInterval(this.lookForEat.bind(this), 100);
	}

	lookForCrash() {
		var pacmanX = this.refs.pacman.state.position.left;
		var pacmanY = this.refs.pacman.state.position.top;
		var pacmanLastX = this.refs.pacman.state.position.left + this.refs.pacman.props.pacmanSize;
		var pacmanLastY = this.refs.pacman.state.position.top + this.refs.pacman.props.pacmanSize;

		for (var i = 1; i <= 4; i++) {
			var currentGhost = this.refs['ghost' + i];
			var currentGhostX = currentGhost.state.position.left;
			var currentGhostY = currentGhost.state.position.top;
			var currentGhostLastX = currentGhost.state.position.left + currentGhost.props.ghostSize;
			var currentGhostLastY = currentGhost.state.position.top + currentGhost.props.ghostSize;

			if ((pacmanX >= currentGhostX && pacmanX <= currentGhostLastX) || (pacmanLastX >= currentGhostX && pacmanLastX <= currentGhostLastX)) {
				if ((pacmanY >= currentGhostY && pacmanY <= currentGhostLastY) || (pacmanLastY >= currentGhostY && pacmanLastY <= currentGhostLastY)) {
					this.crashed = true;
				}
			}

			if (this.crashed) {
				this.props.gameOver();
				clearInterval(this.intervalCrash);
				this.killGhosts();
				break;
			}
		}
	}

	killGhosts() {
		for (var i = 1; i <= 4; i++) {
			var currentGhost = this.refs['ghost' + i];
			currentGhost.kill();
		}

	}

	lookForEat() {
		var pacmanX = this.refs.pacman.state.position.left;
		var pacmanY = this.refs.pacman.state.position.top;
		var pacmanLastX = this.refs.pacman.state.position.left + this.refs.pacman.props.pacmanSize / 2;
		var pacmanLastY = this.refs.pacman.state.position.top + this.refs.pacman.props.pacmanSize / 2;

		for (var i = 1; i <= this.amountOfFood; i++) {
			var currentFood = this.refs['food' + i];
			var currentFoodX = currentFood.state.position.left;
			var currentFoodY = currentFood.state.position.top;
			var currentFoodLastX = currentFood.state.position.left + currentFood.props.foodSize / 2;
			var currentFoodLastY = currentFood.state.position.top + currentFood.props.foodSize / 2;

			if ((pacmanX >= currentFoodX && pacmanX <= currentFoodLastX) || (pacmanLastX >= currentFoodX && pacmanLastX <= currentFoodLastX)) {
				if ((pacmanY >= currentFoodY && pacmanY <= currentFoodLastY) || (pacmanLastY >= currentFoodY && pacmanLastY <= currentFoodLastY)) {
					if (!currentFood.state.hidden) {
						currentFood.ate();
						this.props.increase();
					}
				}
			}

			if (this.crashed) {
				clearInterval(this.intervalFood);
			}
		}
	}

	render() {
		var foods = [];
		this.amountOfFood = ((window.innerWidth - this.props.border - this.props.foodSize ) * (window. innerHeight - this.props.border - this.props.topScoreBoard)) / (this.props.foodSize * this.props.foodSize);
		var currentTop = 0;
		var currentLeft = 0;
		for (var i = 0; i < this.amountOfFood; i++) {
			if (currentLeft + this.props.foodSize >= window.innerWidth  - this.props.border) {
				currentTop += this.props.foodSize;
				currentLeft = 0;
			}

			if (currentTop + this.props.foodSize >= (window. innerHeight - this.props.border - this.props.topScoreBoard)) {
				break;
			}

			var position = {left: currentLeft, top: currentTop};
			currentLeft = currentLeft + this.props.foodSize;
		    foods.push(<Food ref={ 'food' + i } position = {position} key = {i} />);
		}

		return (
			<div className="scene">
				{foods}
				<Pacman ref="pacman"></Pacman>
				<Ghost color="red" ref="ghost1"></Ghost>
				<Ghost color="green" ref="ghost2"></Ghost>
				<Ghost color="blue" ref="ghost3"></Ghost>
				<Ghost color="orange" ref="ghost4"></Ghost>
			</div>
		);
	}
}

Scene.defaultProps = {
	foodSize: 60,
	border: 20,
	topScoreBoard: 100
};

export default Scene;
