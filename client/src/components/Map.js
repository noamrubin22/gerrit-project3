import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-bootstrap";
import BucketMarker from "./BucketMarker";

let reactMap;

const coordinates = {
  jewishMuseum: [
    [13.389967, 52.509463],
    [13.405, 52.509463],
    [13.405, 52.494429999999994],
    [13.389967, 52.494429999999994],
    [13.389967, 52.509463]
  ],
  kreuzbergNorth: [
    [13.405, 52.509463],
    [13.420033000000002, 52.509463],
    [13.420033000000002, 52.494429999999994],
    [13.405, 52.494429999999994]
  ],
  lausitzerPlatz: [
    [13.420033000000002, 52.509463],
    [13.435066000000003, 52.509463],
    [13.435066000000003, 52.494429999999994],
    [13.420033000000002, 52.494429999999994]
  ],
  bergmannkiez: [
    [13.405000000000001, 52.494429999999994],
    [13.405000000000001, 52.47939699999999],
    [13.389967, 52.47939699999999],
    [13.389967, 52.494429999999994]
  ],
  hasenheide: [
    [13.420033000000002, 52.494429999999994],
    [13.420033000000002, 52.47939699999999],
    [13.389967, 52.47939699999999]
  ],
  hermannplatz: [
    [13.435066000000003, 52.494429999999994],
    [13.435066000000003, 52.47939699999999],
    [13.389967, 52.47939699999999]
  ]
};

const Map = () => {
  const [state, setState] = useState({
    viewport: {
      width: 375,
      height: 650,
      longitude: 13.412524,
      latitude: 52.490441,
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
                  color: "#FC625B"
                },
                geometry: {
                  type: "LineString",
                  coordinates: coordinates.jewishMuseum
                }
              },
              {
                type: "Feature",
                properties: {
                  color: "#FC625B"
                },
                geometry: {
                  type: "LineString",
                  coordinates: coordinates.kreuzbergNorth
                }
              },
              {
                type: "Feature",
                properties: {
                  color: "#FC625B"
                },
                geometry: {
                  type: "LineString",
                  coordinates: coordinates.lausitzerPlatz
                }
              },
              {
                type: "Feature",
                properties: {
                  color: "#FC625B"
                },
                geometry: {
                  type: "LineString",
                  coordinates: coordinates.bergmannkiez
                }
              },
              {
                type: "Feature",
                properties: {
                  color: "#FC625B"
                },
                geometry: {
                  type: "LineString",
                  coordinates: coordinates.hasenheide
                }
              },
              {
                type: "Feature",
                properties: {
                  color: "#FC625B"
                },
                geometry: {
                  type: "LineString",
                  coordinates: coordinates.hermannplatz
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
        >
          <Marker longitude={13.3974835} latitude={52.5019465}>
            <BucketMarker size={15} />
          </Marker>
          <Marker longitude={13.4125165} latitude={52.5019465}>
            <BucketMarker size={15} />
          </Marker>
          <Marker longitude={13.4275495} latitude={52.5019465}>
            <BucketMarker size={15} />
          </Marker>
          <Marker longitude={13.3974835} latitude={52.4869135}>
            <BucketMarker size={15} />
          </Marker>
          <Marker longitude={13.4125165} latitude={52.4869135}>
            <BucketMarker size={15} />
          </Marker>
          <Marker longitude={13.4275495} latitude={52.4869135}>
            <BucketMarker size={15} />
          </Marker>
        </ReactMapGL>
      </div>
    </div>
  );
};

export default Map;
