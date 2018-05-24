import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {points: 0};
	}

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	increase() {
		var currentPoints = this.state.points + 1;
		this.setState({points: currentPoints});
	}

	render() {
		return (
			<div className="header">
				<span className="left title">PACMAN</span>
				<span className="right score">SCORE: <span className="points">{this.state.points}</span></span>
			</div>
		);
	}
}

Header.defaultProps = {

};

export default Header;
