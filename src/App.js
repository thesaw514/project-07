import React, { Component } from 'react';
import './App.css';
import Map from './component/Map';
import SquareAPI from './API/';
import SideBar from './component/SideBar';

//react-burger-menu
import { slide as Menu } from 'react-burger-menu';

class App extends Component {

  constructor() {
    super();

    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 14,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen =true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });

    const venue = this.state.venues.find(venue => venue.id === marker.id);
    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
      console.log(newVenue);
    });
  };


  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  };

  componentDidMount() {
    SquareAPI.search({
      ll: '33.774830,-84.296310',
      near: 'Atlanta, GA',
      query: 'Pizza'
    })
    .then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        }
      })
      this.setState({ venues, center, markers });
      console.log(results);
    });
  }

  render() {
    return (
      <div className="App">
        <Menu width={'25vw'}>
          <SideBar
            {...this.state}
              handleListItemClick={this.handleListItemClick}
          />
        </Menu>
        <Map
          {...this.state}
            handleMarkerClick={this.handleMarkerClick}
            closeAllMarkers={this.closeAllMarkers} 
            onCloseClick={this.closeAllMarkers}
        />
      </div>
    );
  }
}

export default App;
