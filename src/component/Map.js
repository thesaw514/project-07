// Theodore Sawyer, FEND - Project 07: 'Neighborhood Map (React)' / Map.js / 10.20.18

/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    zoom={props.zoom}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={props.center}
    defaultOptions={{
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: true,
      rotateControl: false,
      fullscreenControl: false
    }}
  >
    {props.markers &&
      props.markers.filter(marker => marker.isVisible).map((marker, idx, arr) => {

        const venueInfo = props.venues.find(venue => venue.id === marker.id);

        return (
          <Marker
            key={idx}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.handleMarkerClick(marker)}
            animation={marker.isOpen === true ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
          >
            {marker.isOpen &&
              venueInfo.bestPhoto && (
                <InfoWindow onCloseClick={() => props.closeAllMarkers()} >
                  <React.Fragment>
                    <img src={`${venueInfo.bestPhoto.prefix}150x150${venueInfo.bestPhoto.suffix}`} alt={'Venue Img'}
                    />
                  <h3>{venueInfo.name}</h3>
                  <p>Rating: {venueInfo.rating}</p>
                  <p>{venueInfo.location.address}<br />
                  {venueInfo.location.city}, {venueInfo.location.state}</p>
                  <p>
                    <a className='tel' href='tel:'>{venueInfo.contact.formattedPhone}</a>
                  </p>
                  <p className='data-fs'>Data: FourSquare API</p>
                  </React.Fragment>
                </InfoWindow>
              )}
            </Marker>
          )})}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBC9GkcUSe5d-ofljm2v11CeoCs1j4KgJY"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
