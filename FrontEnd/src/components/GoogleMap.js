import React, { useState, useEffect } from "react";
import $ from "jquery";
import {
  GoogleMap,
  GroundOverlay,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const GoogleMaps = (props) => {
  const [center, setCenter] = useState({ lat: 40.62, lng: 22.94 });
  //   const params = {
  //     access_key: "cfd0f08e2d49d7ecc4762f4b3efc7724",
  //     query: "Sapfous 160, 17675",
  //     limit: 1,
  //   };
  //   axios
  //     .get("http://api.positionstack.com/v1/forward", { params })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("Something went wrong! Try again");
  //     });
  useEffect(() => {
    $.ajax({
      url: "http://api.positionstack.com/v1/forward",
      data: {
        access_key: "9350aa2e25610bf0c074fca63e4ce1ca",
        query: props.address,
        limit: 1,
        // country: "GR",
      },
    }).done(function (data) {
      setCenter({
        lat: data.data[0].latitude,
        lng: data.data[0].longitude,
      });
    });
  });

  return (
    <LoadScript googleMapsApiKey="AIzaSyDn8rRqJ6keQQ0dvkCI3bkH-eyp0jSBRb0">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
