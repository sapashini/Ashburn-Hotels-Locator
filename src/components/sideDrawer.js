import React, { Component } from 'react';
import ListOfVenues from './listOfVenues';


class SideDrawer extends Component {

	state = {
		query: "",
		venues: []
	}

	// A method to filter the hotel list.
	filterVenues = () => {
		if (this.state.query.trim() !== "") {
			const venues = this.props.venues.filter(venue => 
				venue.name.toLowerCase().includes(this.state.query.toLowerCase())
			);
			return venues;
		}
		return this.props.venues;
	}

	// A method to listen to change in the hotel list.
	venueFilterChange = evt => {
		this.setState({query: evt.target.value});
		const markers = this.props.venues.map(venue => {
			const matched = venue.name.toLowerCase().includes(evt.target.value.toLowerCase());
			const marker = this.props.markers.find(marker => marker.id === venue.id);
			if(matched) {
				marker.isVisible = true;
			}else {
				marker.isVisible = false;
			}
			return marker;
		});
		this.props.upDateState({markers})
	}

	render() {
		let sideDrawerVisible = "hide"
		if (this.props.sideDrawerOpen) {
			sideDrawerVisible = "show"
		}
		return (
			<div id="side-drawer" className={sideDrawerVisible}>
				<label className="text-label" htmlFor="search" tabIndex="0">Filter Hotels :</label>
				<input type={"search"} id={"search"} value={this.props.query} onChange={this.venueFilterChange} />
				<ListOfVenues 
					{...this.props}
					onListClick={this.props.onListClick}
					venues={this.filterVenues()}
				/>
			</div>
		)
	}
}
export default SideDrawer;