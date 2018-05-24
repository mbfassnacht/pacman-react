import React from 'react';
import ReactDOM from 'react-dom';

class Food extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			position: {
				top:  this.props.position.top,
				left: this.props.position.left
			},
			hidden: false
		};
	}

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	ate() {
		this.setState({
			hidden: true
		});
	}

	render() {
		return (
			<div style = {this.state.position} className={this.state.hidden ? 'food hidden' : 'food'}>
				<div className="effective-food"></div>
			</div>
		);
	}
}

Food.defaultProps = {
	foodSize: 60
};

export default Food;
