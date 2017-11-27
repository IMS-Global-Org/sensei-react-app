import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div>{text}</div>;

class LocationGoogleMap extends Component {
  state = {
    center: { lat: 39.231313, lng: -111.046605 },
    zoom: 15
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >
        <Marker
          lat={39.231313}
          lng={-111.046605}
          text='Marial Arts Studio'
        />
      </GoogleMapReact>
    );
  }
}

export default LocationGoogleMap
