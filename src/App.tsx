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

  const onClick = useCallback((event: MapLayerMouseEvent) => {
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
  }, []);
  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.78,
          zoom: 10,
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
              padding: "10px 15px",
              backgroundColor: "white",
              textAlign: "center",
              color: "black",
            }}
          >
            <div>Population: {marker.population}</div>
          </Marker>
        )}
      </Map>
    </>
  );
}

export default App;
