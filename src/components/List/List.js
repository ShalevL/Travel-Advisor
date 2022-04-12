import { useState, useEffect, createRef, Fragment } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";

import PlaceDetails from "../PlaceDetails/PlaceDetails";

function List(props) {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  function onSelectTypeHandler(event) {
    props.setType(event.target.value);
  }

  function onSelectRatingHandler(event) {
    props.setRating(event.target.value);
  }

  useEffect(
    function () {
      const refs = Array(props.places?.length)
        .fill()
        .map(function (_, i) {
          return elRefs[i] || createRef();
        });
      setElRefs(refs);
    },
    [props.places]
  );

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels and Attractions around you
      </Typography>
      {props.isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <Fragment>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={props.type} onChange={onSelectTypeHandler}>
              <MenuItem value="restaurants">restaurants</MenuItem>
              <MenuItem value="hotels">hotels</MenuItem>
              <MenuItem value="attractions">attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={props.rating} onChange={onSelectRatingHandler}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3</MenuItem>
              <MenuItem value={4}>Above 4</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {props.places?.map(function (place, index) {
              return (
                <Grid ref={elRefs[index]} item key={index} xs={12}>
                  <PlaceDetails
                    place={place}
                    selected={Number(props.childClicked) === index}
                    refProp={elRefs[index]}
                  ></PlaceDetails>
                </Grid>
              );
            })}
          </Grid>
        </Fragment>
      )}
    </div>
  );
}

export default List;
