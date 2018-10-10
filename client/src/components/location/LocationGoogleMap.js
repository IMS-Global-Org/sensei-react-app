import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components'

const Marker = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: red;
  width: 100px;
  text-align: justify;
`


class LocationGoogleMap extends Component {
  state = {
    center: { lat: 39.231313, lng: -111.046605 },
    zoom: 16
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >
        <Marker
          lat={39.231313}
          lng={-111.046605}>
            Martial Arts Studio
        </Marker>
      </GoogleMapReact>
    );
  }
}

export default LocationGoogleMap
