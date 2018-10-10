import React, { Component } from 'react'
import {
  Container, Segment,
  Header, Card, Icon,
} from 'semantic-ui-react'
import LocationGoogleMap from './LocationGoogleMap'
import styled from 'styled-components'

import '../../styles/martial_arts.css'

// Custom Styled Components
const Map = styled(Card)`
  width: 100% !important;
`

class Location extends Component {

    state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Orangeville, UT`,
        defaultAnimation: 2,
      }],
    };

    handleMapLoad = (map) => {
      this._mapComponent = map;
      if (map) {
        console.log(map.getZoom());
      }
    }

    /*
     * This is called when you click on the map.
     * Go and try click now.
     */
    handleMapClick = (event) => {
      const nextMarkers = [
        ...this.state.markers,
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ];
      this.setState({
        markers: nextMarkers,
      });

      if (nextMarkers.length === 3) {
        this.props.toast(
          `Right click on the marker to remove it`,
          `Also check the code!`
        );
      }
    }

    handleMarkerRightClick = (targetMarker) => {
      /*
       * All you modify is data, and the view is driven by data.
       * This is so called data-driven-development. (And yes, it's now in
       * web front end and even with google maps API.)
       */
      const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
      this.setState({
        markers: nextMarkers,
      });
    }

  render() {
    return (
      <Container>
        <Segment style={{ width: '50%', margin: '0 25%' }}>
          <Header as='h1' icon textAlign='center'>
            <Icon name='map signs' size='massive' circular />
            <Header.Content>
              Bobby Lawrence Karate School
            </Header.Content>
            <Header.Subheader>
              Castle Valley, Utah
            </Header.Subheader>
          </Header>
          <p style={{ textAlign: 'justify' }}>
            We are located directly above Orangeville's very own local supermarket,
            Food Ranch.  Please contact us at 435-748-2020 for class information.
          </p>
        </Segment>
        <Segment>
          <Header as='h2' textAlign='center'>Location Information</Header>
          <Map>
            <Card.Content>
              <Card.Header>
                Bobby Lawrence Karate School
              </Card.Header>
              <Card.Description>
                <p>
                  <a
                    target='_blank'
                    rel="noopener noreferrer"
                    href='https://www.google.com/maps/place/Food+Ranch/@39.2311828,-111.047749,462m/data=!3m1!1e3!4m13!1m7!3m6!1s0x87495666ce16d70f:0xe387eead3695f9fd!2s355+UT-29,+Orangeville,+UT+84537!3b1!8m2!3d39.2325854!4d-111.0524176!3m4!1s0x87495666c1614637:0x5cc5f024ae339316!8m2!3d39.2311828!4d-111.0466041'>
                    355 East SR29<br />
                    Orangeville, UT  84537<br />
                    Located on the upstairs floor of Food Ranch
                </a>
              </p>
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div style={{width: '100%', height: '600px'}}>
                <LocationGoogleMap />
              </div>
            </Card.Content>
          </Map>
        </Segment>
      </Container>
    )
  }
}

export default Location
