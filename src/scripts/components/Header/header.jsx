import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="header">
				<span className="left title">PACMAN</span>
				<span className="right score">SCORE: <span className="points">0</span></span>
			</div>
		);
	}
}

Header.defaultProps = {

};

export default Header;
