import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import { Rating } from "@material-ui/lab";

import useStyles from "./styles";
import { useState } from "react";

function Map(props) {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  function onChangeHandler(event) {
    props.setCoordinates({ lat: event.center.lat, lng: event.center.lng });
    props.setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
  }

  function onChildClickHandler(child) {
    props.setChildClicked(child);
  }

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={props.coordinates}
        center={props.coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={onChangeHandler}
        onChildClick={onChildClickHandler}
      >
        {props.places?.map(function (place, i) {
          return (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {!isDesktop ? (
                <LocationOnIcon key={i} color="primary" fontSize="large" />
              ) : (
                <Paper key={i} elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.Typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo?.images
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    alt={place.name}
                  />
                  <Rating
                    size="small"
                    name="read-only"
                    value={Number(place.rating)}
                    readOnly
                  />
                </Paper>
              )}
            </div>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
