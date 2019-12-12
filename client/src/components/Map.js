import React, { useState, useEffect } from "react";
import { StaticMap, Marker, GeolocateControl } from "react-map-gl";
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-bootstrap";

let reactMap;

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10,


};

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
      width: 370,
      height: 675,
      longitude: 13.412524,
      latitude: 52.492441,
      zoom: 12.4
    }
  });

  useEffect(() => {
    const map = reactMap.getMap();
    map.on("load", () => {
      map.scrollZoom.disable();
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
    <div className="map">
      <StaticMap
        ref={map => (reactMap = map)}
        mapboxApiAccessToken={
          "pk.eyJ1IjoiYXJlc2FuIiwiYSI6ImNrM3UzYWxjbzAyYWMzbHRkYThjeGU3ODMifQ.uMuoyhCcGP0EXyd_f-oS0g"
        }
        {...state.viewport}
        onViewportChange={viewport => setState({ viewport })}
      >
        <div>
          <h1 id="map-header">All six chatrooms</h1>
        </div>
        <Marker longitude={13.389967} latitude={52.509463}>
          <div className="bucketName">
            <p>Jewish Museum</p>
          </div>
        </Marker>

        <Marker longitude={13.405} latitude={52.509463}>
          <div className="bucketName">
            <p>Kreuzberg North</p>
          </div>
        </Marker>

        <Marker longitude={13.420033000000002} latitude={52.509463}>
          <div className="bucketName">
            <p>Lausitzer Platz</p>
          </div>
        </Marker>

        <Marker longitude={13.389967} latitude={52.494429999999994}>
          <div className="bucketName">
            <p>Bergmannkiez</p>
          </div>
        </Marker>
        <Marker longitude={13.405000000000001} latitude={52.494429999999994}>
          <div className="bucketName">
            <p>Hansenheide</p>
          </div>
        </Marker>
        <Marker longitude={13.420033000000002} latitude={52.494429999999994}>
          <div className="bucketName">
            <p>Hermannplatz</p>
          </div>
        </Marker>
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </StaticMap>
    </div>
  );
};

export default Map;
