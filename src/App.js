import { CssBaseline, Grid } from "@material-ui/core";
import { Fragment } from "react";
import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({ ne: 0, sw: 0 });
  const [childClicked, setChildClicked] = useState(null);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  function onSetCoordinatesHandler(coordinates) {
    setCoordinates(coordinates);
  }

  function onSetBoundsHandler(bounds) {
    setBounds(bounds);
  }

  function onSetChildClickedHandler(child) {
    setChildClicked(child);
  }

  function onSetTypeHandler(type) {
    setType(type);
  }

  function onSetRatingHandler(rating) {
    setRating(rating);
  }

  useEffect(function () {
    setIsLoading(true);
    if (!navigator.geolocation) {
    } else {
      navigator.geolocation.getCurrentPosition(function ({
        coords: { latitude, longitude },
      }) {
        setCoordinates({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  useEffect(
    function () {
      const bl_latitude = bounds.sw.lat;
      const tr_latitude = bounds.ne.lat;
      const bl_longitude = bounds.sw.lng;
      const tr_longitude = bounds.ne.lng;

      const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=${bl_latitude}&tr_latitude=${tr_latitude}&bl_longitude=${bl_longitude}&tr_longitude=${tr_longitude}&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=30&currency=USD&open_now=false&lunit=km&lang=en_US`;

      fetch(URL, {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          "X-RapidAPI-Key": "",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (bounds.sw && bounds.ne) {
            setPlaces(
              data?.data.filter(function (place) {
                return place.name && place.num_reviews > 0;
              })
            );
            setFilteredPlaces([]);
            setIsLoading(false);
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    },
    [type, bounds]
  );

  useEffect(
    function () {
      const filteredPlaces = places.filter(function (place) {
        return place.rating > rating;
      });
      setFilteredPlaces(filteredPlaces);
    },
    [rating]
  );

  return (
    <Fragment>
      <CssBaseline />
      <Header setCoordinates={onSetCoordinatesHandler} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={onSetTypeHandler}
            rating={rating}
            setRating={onSetRatingHandler}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={onSetCoordinatesHandler}
            setBounds={onSetBoundsHandler}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={onSetChildClickedHandler}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default App;
