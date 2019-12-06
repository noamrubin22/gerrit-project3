import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Container } from "react-bootstrap";

const Map = () => {
  const [state, setState] = useState({
    viewport: {
      width: 400,
      height: 600,
      longitude: 13.410824,
      latitude: 52.503441,
      zoom: 13
    }
  });
  return (
    <div className="mapContainer">
      <h1 id="mapHeader">All live walls</h1>
      <div className="map">
        <ReactMapGL
          mapboxApiAccessToken={
            "pk.eyJ1IjoiYXJlc2FuIiwiYSI6ImNrM3UzYWxjbzAyYWMzbHRkYThjeGU3ODMifQ.uMuoyhCcGP0EXyd_f-oS0g"
          }
          {...state.viewport}
          onViewportChange={viewport => setState({ viewport })}
        />
      </div>
    </div>
  );
};
export default Map;
