import * as React from "react";

const Marker = (props) => {
  const [marker, setMarker] = React.useState();
  const onClick = props.onClick;

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        if (props.markerClusterer) {
          props.markerClusterer.removeMarker(marker);
        }
      }
    };
  }, [marker, props.markerClusterer]);

  React.useEffect(() => {
    if (marker) {
      marker.addListener("click", onClick);
    }
  }, [marker, onClick]);

  React.useEffect(() => {
    if (marker && props.position.lat && props.position.lng) {
      marker.setOptions({
        position: props.position
      });

      if (props.markerClusterer) {
        props.markerClusterer.addMarker(marker);
      }
    }
  }, [marker, props]);

  return null;
};

export default Marker;