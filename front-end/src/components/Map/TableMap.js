import React from "react";
import constants from "../../constants";
import { Button } from "@mui/material";

const TableMap = (props) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  const { style, children, onBoundsChanged, onCenterChanged, onZoomChanged, selectingLocation } = props;

  let zoom = props.zoom || constants.MAP_ZOOM_START;
  let center = props.center;
  if (!center) {
    center =  {
      lat: constants.MAP_CENTER_LAT_START,
      lng: constants.MAP_CENTER_LNG_START
    };
  }

  let mapOptions = props.mapOptions;
  if (!mapOptions) {
    mapOptions = constants.DEFAULT_MAP_OPTIONS;
  }
  
  React.useEffect(() => {
    if (ref.current && !map) {
      let map = new window.google.maps.Map(ref.current, {});
      map.setOptions(mapOptions);
      map.setZoom(zoom);
      map.setCenter(center);

      setMap(map);
    }
  }, [ref, map, mapOptions, zoom, center]);

  React.useEffect(() => {
    if (map) {
      window.google.maps.event.clearListeners(map, "click");

      map.addListener("click", e => {
        if (selectingLocation && e.placeId) {
            e.stop();
            map.setCenter(e.latLng);
        }
      })

      if (onBoundsChanged) {
        map.addListener("bounds_changed", () => onBoundsChanged(map.getBounds()));
      }

      if (onCenterChanged) {
        map.addListener("center_changed", () => onCenterChanged(map.getCenter()));
      }

      if (onZoomChanged) {
        map.addListener("zoom_changed", () => onZoomChanged(map.getZoom()));
      }
    }
  }, [map, onBoundsChanged, onCenterChanged, onZoomChanged, selectingLocation]);

  const centerCurrentLocation = e => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(p => {
        // Zoom in if the map isn't already zoomed past the default
        if (map.getZoom() < constants.CENTER_CURRENT_LOCATION_ZOOM_DEFAULT) {
          map.setZoom(constants.CENTER_CURRENT_LOCATION_ZOOM_DEFAULT);
        }

        map.setCenter({
          lat: p.coords.latitude,
          lng: p.coords.longitude
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  const centerMarkerImg = (
    <img
      src="https://maps.gstatic.com/mapfiles/markers/marker.png"
      alt="marker"
      style={{position:"absolute", top:"calc(50% - 35px)", left:"calc(50% - 10px)", zIndex:"1"}}
    />
  );

  return (
    <>
      <Button onClick={centerCurrentLocation}>Use My Location</Button>
      <div style={{ position: "relative" }}>
        { selectingLocation && centerMarkerImg }
        <div ref={ref} style={style} />
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // set the map prop on the child component
            return React.cloneElement(child, { map });
          }
        })}
      </div>
    </>
  );
};

export default TableMap;