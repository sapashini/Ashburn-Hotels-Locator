/*global google*/
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps";

// withScriptjs, is used to avoid puting a <script/> tag for Google Maps JavaScript API v3 in the HTML's <head/> element.
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
		<GoogleMap
		    defaultZoom={10}
		    zoom = {props.zoom}
		    defaultCenter={{ lat: 39.050739, lng: -77.487425 }}
		    center={props.center}
		>
    		{
    			props.markers && props.markers
	    			.filter(marker => marker.isVisible)
	    			.map((marker,index,arr) => {
	    				const venueInfo = props.venues.find(venue => venue.id === marker.id);
	    				return (
	    					<Marker 
		    					key={index} 
		    					position={{ lat: marker.lat, lng: marker.lng }} 
		    					onClick={ () => props.onMarkerClick(marker) } 
		    					animation={arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
	    					>
			    				{marker.isOpen && venueInfo.bestPhoto && (
			    					<InfoWindow>
			    						<React.Fragment>
			    							<h2>{venueInfo.name}</h2>
			    							<img 
				    							src={`${venueInfo.bestPhoto.prefix}250x250${
				    								venueInfo.bestPhoto.suffix}`}
				    							alt={`${venueInfo.photos.prefix}250x250${
				    								venueInfo.photos.suffix}`}
			    							/>
			    							<h4>Address: {venueInfo.location.formattedAddress}</h4>
			    							<h4>Phone: {venueInfo.contact.formattedPhone}</h4>
			    						</React.Fragment>
			    					</InfoWindow>
				    			)}

		    				</Marker>
	    				);
	    		})
    		}
  		</GoogleMap>
))

class Map extends Component {

	render() {
		window.gm_authFailure = () => {alert("Error authenticating with the Google Maps API...please check your API key!")};
		return (
				<MyMapComponent
				  role="application"
				  aria-label="map"
				  {...this.props}
				  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDjc17HMSVSoBHZFmeEZliKYQO28zFuwpY&callback=initMap"
				  loadingElement={<div style={{ height: `100%` }} />}
				  containerElement={<div className="map"  style={{ height: `100%`, width: `100%` }} />}
				  mapElement={<div style={{ height: `100%` }} />} 
				/>
			);
	}

}
export default Map;