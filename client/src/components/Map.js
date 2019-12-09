import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-bootstrap";

let reactMap;

const Map = () => {
  const [state, setState] = useState({
    viewport: {
      width: 400,
      height: 600,
      longitude: 13.410824,
      latitude: 52.503441,
      zoom: 12
    }
  });

  useEffect(() => {
    const map = reactMap.getMap();
    map.on("load", () => {
      console.log(map);
      map.addLayer({
        id: "lines",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  color: "#33C9EB"
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [13.389967, 52.509463],
                    [13.405, 52.509463],
                    [13.405, 52.494429999999994],
                    [13.389967, 52.494429999999994],
                    [13.389967, 52.509463]
                  ]
                }
              },
              {
                type: "Feature",
                properties: {
                  color: "#33C9EB" // blue
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [13.405, 52.509463],
                    [13.420033000000002, 52.509463],
                    [13.420033000000002, 52.494429999999994],
                    [13.405, 52.494429999999994]
                  ]
                }
              },
              {
                type: "Feature",
                properties: {
                  color: "#33C9EB" // blue
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [13.420033000000002, 52.509463],
                    [13.435066000000003, 52.509463],
                    [13.435066000000003, 52.494429999999994],
                    [13.420033000000002, 52.494429999999994]
                  ]
                }
              },
              {
                type: "Feature",
                properties: {
                  color: "#33C9EB" // blue
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [13.405000000000001, 52.494429999999994],
                    [13.405000000000001, 52.47939699999999],
                    [13.389967, 52.47939699999999],
                    [13.389967, 52.494429999999994]
                  ]
                }
              },
              {
                type: "Feature",
                properties: {
                  color: "#33C9EB" // blue
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [13.420033000000002, 52.494429999999994],
                    [13.420033000000002, 52.47939699999999],
                    [13.389967, 52.47939699999999]
                  ]
                }
              },
              {
                type: "Feature",
                properties: {
                  color: "#33C9EB" // blue
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [13.435066000000003, 52.494429999999994],
                    [13.435066000000003, 52.47939699999999],
                    [13.389967, 52.47939699999999]
                  ]
                }
              }
            ]
          }
        },
        paint: {
          "line-width": 3,
          "line-color": ["get", "color"]
        }
      });
    });
  }, []);

  return (
    <div className="mapContainer">
      <h1 id="mapHeader">All live walls</h1>
      <div className="map">
        <ReactMapGL
          ref={map => (reactMap = map)}
          mapboxApiAccessToken={
            "pk.eyJ1IjoiYXJlc2FuIiwiYSI6ImNrM3UzYWxjbzAyYWMzbHRkYThjeGU3ODMifQ.uMuoyhCcGP0EXyd_f-oS0g"
          }
          {...state.viewport}
          onViewportChange={viewport => setState({ viewport })}
        ></ReactMapGL>
      </div>
    </div>
  );
};

export default Map;
