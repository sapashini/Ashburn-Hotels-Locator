import React, { Component } from 'react';
import ListItem from './listItem';

class ListOfVenues extends Component {
	render() {
		return (
		  <ol className="venue-list" >
		  	{this.props.venues &&
					this.props.venues.length > 0 &&
					this.props.venues
					.map((venue, index) => (
					  <ListItem key={index} {...venue} 
					  onListClick={this.props.onListClick}
					  sideDrawerOpen={this.props.sideDrawerToggle}
					  />
					))
			}
		  </ol>
		)
	}
}

export default ListOfVenues;