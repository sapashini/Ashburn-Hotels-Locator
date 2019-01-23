import React, { Component } from 'react';


class ToggleButton extends Component {
	render() {
		return (
			<div tabIndex="0">
				<button className="toggle-button" onClick={this.props.handleMouseClick}>
					<div className="toggle-button-line" />
					<div className="toggle-button-line" />
					<div className="toggle-button-line" />
				</button>
			</div>
	  );
   }
}
export default ToggleButton;