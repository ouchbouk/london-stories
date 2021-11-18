import React, { Component } from "react";
import GoogleMapReact from "google-map-react";



const Marker = () => (
  <div>
    <img style={{transform: "translate(0,-100%)"}} alt="marker" src="/marker.png" height="20px" width="20px" />
  </div>
);
class Map extends Component {
  render() {
    if (!this.props.geocode) return "";

    return (
      <div style={{ height: "40rem", width: "40rem" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={this.props.geocode}
          defaultZoom={11}
        >
          <Marker
            lat={this.props.geocode.lat}
            lng={this.props.geocode.lng}
            
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
