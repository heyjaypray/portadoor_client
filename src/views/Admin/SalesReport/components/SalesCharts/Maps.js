import React, { Component, useState } from 'react';
import { NavLink } from 'reactstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';


// To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app
const apiKey = 'AIzaSyB_JC10u6MVdITB1FhLhCJGNu_qQ8kJyFE';

const defaultZoom = 13;
// const defaultCenter = []
// const locations = [];

class MarkerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: []
    };
  }

  render() {
    const { locations } = this.props;
    return locations.map((location, index) => {
      return (
        <MarkerWithInfoWindow key={index} location={location} />
      );
    }
    );
  }
}

class MarkerWithInfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { location } = this.props;

    return (
      <Marker onClick={this.toggle} position={location} title={location.title} label={location.label}>
        {this.state.isOpen &&
                    <InfoWindow onCloseClick={this.toggle}>
                      <NavLink href={location.www} target="_blank">{location.title}</NavLink>
                    </InfoWindow>}
      </Marker>
    );
  }
}

const GoogleMapsComponent = withScriptjs(withGoogleMap((props) => {
 
  return (
    <GoogleMap defaultZoom={defaultZoom} center={props.defaultCenter[0]}>
      {<MarkerList locations={props.locations} />}
    </GoogleMap>
  );
}
));

const Maps = (props) =>  {

  const [locations, setLocations] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState([]);



  return (
    <div className="animated fadeIn">

      <GoogleMapsComponent
        key="map"
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        locations={locations}
        defaultCenter={defaultCenter}
      />

    </div>
  );
  
};

export default Maps;
