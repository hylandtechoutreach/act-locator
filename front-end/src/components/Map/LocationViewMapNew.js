import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import GpsFixedTwoToneIcon from '@mui/icons-material/GpsFixedTwoTone';
import Container from "@mui/system/Container";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Icon from '@mui/material/Icon';


import axios from "../../axiosRequests";
import * as constants from "../../constants";
import Marker from "./Marker";
import TableMap from "./TableMapNew";
import TablePopup from "./TablePopup";

import "./LocationViewMapNew.css"

const render = () => {
  return <CircularProgress size="100px" />;
};

const getTablePosition = (tbl) => {
  const coords = tbl.coordinateLocation.coordinates;

  return {
    lat: coords[constants.GEOJSON_LATITUDE_INDEX],
    lng: coords[constants.GEOJSON_LONGITUDE_INDEX],
  };
};

const LocationViewMapNew = () => {
  const [zoom, setZoom] = React.useState(
    Number(localStorage.getItem("zoom")) || 3
  );
  const [center, setCenter] = React.useState({
    lat: Number(localStorage.getItem("center-lat")) || 40,
    lng: Number(localStorage.getItem("center-lng")) || -97,
  });

  const [currentTableId, setCurrentTableId] = React.useState("");
  const [tableLocations, setTableLocations] = React.useState([]);

  React.useEffect(() => {
    localStorage.setItem("zoom", zoom);
  }, [zoom]);

  React.useEffect(() => {
    localStorage.setItem("center-lat", center.lat);
    localStorage.setItem("center-lng", center.lng);
  }, [center]);

  const onCenterChanged = (center) => {
    setCenter({
      lat: center.lat(),
      lng: center.lng(),
    });
  };

  const onMarkerClicked = tblId => {
    setCurrentTableId(tblId)
  }


  const onZoomChanged = (zoom) => {
    setZoom(zoom);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("api/tables/all");
        setTableLocations(response.data);
      } catch (e) {
        alert("Something wrong with getting tables");
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        render={render}
        libraries={["places"]}
      >
        <TableMap
          center={center}
          onCenterChanged={onCenterChanged}
          onZoomChanged={onZoomChanged}
          zoom={zoom}
          style={{ width: "100%", height: "100vh" }}
        >
          {tableLocations.map((tbl, i) => (
            <Marker
              key={i}
              position={getTablePosition(tbl)}
              onClick={() => onMarkerClicked(tbl.id)}
            />
          ))}
        </TableMap>
        <TablePopup
          tableId={currentTableId}
          onClose={() => setCurrentTableId('')}
          open={!!currentTableId}
        />
        <div className="add-new-floater">
          <Icon component={AddCircleIcon} fontSize="large" className="add-circle" />
        </div>
      </Wrapper>
    </div>
  );
};

export default LocationViewMapNew;
