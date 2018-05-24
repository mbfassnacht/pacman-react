import React from 'react';
import ReactDOM from 'react-dom';
import SVGInline from "react-svg-inline"
import icon from '../../../assets/images/pacman.svg';

class Pacman extends React.Component {

	constructor(props) {
		super(props);
		this.state = { looking: 'right', position: {top: 0, left: 0} };
	}

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
		setInterval(this.move.bind(this), 100);
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
	}

	handleKeyDown(e) {
		var arrows = [37, 38, 39, 40];

		if (arrows.indexOf(e.keyCode) >= 0) {
			this.rotate(e.keyCode);
		}
	}

	move() {
		var currentLeft = this.state.position.left;
		var currentTop = this.state.position.top;
		if (this.state.looking === 'left') {
			this.setState({
				position: {top: currentTop, left: Math.max(currentLeft - this.props.velocity, 0) }
		    });
		} else {
			if (this.state.looking === 'up') {
				this.setState({
					position: {top: Math.max(currentTop - this.props.velocity, 0), left: currentLeft }
			    });
			} else {
				if (this.state.looking === 'right') {
					this.setState({
						position: {top: currentTop, left: Math.min(currentLeft + this.props.velocity, window.innerWidth - this.props.border - this.props.pacmanSize) }
				    });
				} else {
					this.setState({
						position: {top: Math.min(currentTop + this.props.velocity, window.innerHeight - this.props.pacmanSize - this.props.border - this.props.topScoreBoard), left: currentLeft }
				    });
				}
			}
		}
	}

	rotate(keypressed) {
		if (keypressed === 37) {
			this.setState({looking: 'left'});
		} else {
			if (keypressed === 38) {
				this.setState({looking: 'up'});
			} else {
				if (keypressed === 39) {
					this.setState({looking: 'right'});
				} else {
					this.setState({looking: 'down'});
				}
			}
		}
	}

	render() {
		return (
			<div style = {this.state.position} className = {'pacman ' + (this.state.looking)}>
				<SVGInline svg = {icon} />
			</div>
		);
	}
}

Pacman.defaultProps = {
	velocity: 20,
	pacmanSize: 60,
	border: 20,
	topScoreBoard: 100
};

export default Pacman;
