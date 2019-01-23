import React, { Component } from 'react';


class ListItem extends Component {
	render() {
		return (
		  <li className="list-item">
		    <button className="list-item-btn" onClick={() => this.props.onListClick(this.props)}>
		    	{this.props.name}
		    </button>
		 </li>
	  );
   }
}
export default ListItem;
