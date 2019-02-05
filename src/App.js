import React, { Component } from 'react';
import './App.css';
import Map from "./components/map";
import SideDrawer from "./components/sideDrawer";
import ToggleButton from "./components/toggleButton";
import FourSquareAPI from "./API"

class App extends Component {

// App state data.
  state = {
    venues: [],
    markers: [],
    center: [],
    zoom: 12,
    sideDrawerOpen: false,
    upDateState: stateObject => {
      this.setState(stateObject);
    }
  }

  // A function to listen to click events on the toggle hamburger button.
  handleMouseClick = (evt) => {
    this.sideDrawerToggle();
    evt.stopPropagation();
  }

  // A function to toggle the side bar.
  sideDrawerToggle = () => {
    // To gruntee state change,I will pass in the previous state as an argument into a function.
    this.setState((prevState) => {
      return {sideDrawerOpen: !this.state.sideDrawerOpen}
    });
  }

  // A function to close a marker when another is open.
  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
  });
    this.setState({markers: Object.assign(this.state.markers, markers)})
  }

  // A function to open a marker.
  onMarkerClick = marker => {
    this.closeMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)})

    const venue = this.state.venues.find(venue => venue.id === marker.id);
    FourSquareAPI.venuesDetails(marker.id).then(res => {
      const clickedVenue = Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, clickedVenue)});
      console.log(res);
    });
  }

  // A function to open a marker via marker's list name.
  onListClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.onMarkerClick(marker);
  }

  // A method called,after the markup is set on the page, to fetch data from Foursquare API.
  componentDidMount() {
    FourSquareAPI.search({
      query: "hotel",
      near: "Ashburn,VA",
      radius: 5000
    })
    .then(res => {
      const {venues} = res.response;
      const {center} = res.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({venues,center,markers})
      console.log(res);
    });
  }

  // A method to return a JSX with the app data.
  render() {
    return (
      <div className="App">

        <nav className="App-header" tabIndex="0">
          <h4 tabIndex="0">Ashburn Hotels Locator</h4>
          <ToggleButton 
            handleMouseClick={this.handleMouseClick}
          />
        </nav>

        <section className="App-side-drawer">
          <SideDrawer
            {...this.state}
            markers={this.state.markers}
            onListClick={this.onListClick}
            upDateState={this.state.upDateState}
            handleMouseClick={this.handleMouseClick}
            sideDrawerOpen={this.state.sideDrawerOpen}
          />
        </section>

        <main className="App-main">
          <Map 
              {...this.state} 
              onMarkerClick = {this.onMarkerClick}
              handleMouseClick={this.handleMouseClick}
              sideDrawerOpen={this.state.sideDrawerOpen}
          />
        </main>

      </div>
    );
  }
}

export default App;
