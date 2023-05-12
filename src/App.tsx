import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import bbox from "@turf/bbox";
import MAP_STYLE from "./map-style";
import Map, { Marker } from "react-map-gl";
import type { MapboxStyle, MapLayerMouseEvent, MapRef } from "react-map-gl";
import { useCallback, useState } from "react";

function App() {
  const mapRef = React.useRef<MapRef | null>(null);

  const [marker, setMarker] = useState<any>(null);

  const onClick = useCallback(
    (event: MapLayerMouseEvent) => {
      console.log(marker);
      const feature = event.features?.[0];
      if (feature) {
        const [minLng, minLat, maxLng, maxLat] = bbox(feature);

        const center = mapRef.current?.getCenter();
        setMarker({
          ...center,
          ...feature.properties,
        });
        mapRef.current?.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          { padding: 40, duration: 1000 }
        );
      }
    },
    [marker]
  );
  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 45.9588273520001,
          latitude: 39.272436015000139,
          zoom: 2,
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle={MAP_STYLE as MapboxStyle}
        interactiveLayerIds={["sf-neighborhoods-fill"]}
        onClick={onClick}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {marker && (
          <Marker
            longitude={marker.lng}
            latitude={marker.lat}
            anchor="bottom"
            style={{
              padding: "8px 20px",
              backgroundColor: "#ffffff7d",
              textAlign: "center",
              color: "black",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                margin: 0,
                padding: "3px 0",
              }}
            >
              {marker.ADMIN}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Visa sayı:</span>
              <span>{marker.population}</span>
            </div>
          </Marker>
        )}
      </Map>
    </>
  );
}

export default App;
