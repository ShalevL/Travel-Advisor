import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import { Place } from "@material-ui/icons";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import { Rating } from "@material-ui/lab";

import useStyles from "./styles";

function PlaceDetails(props) {
  const classes = useStyles();

  if (props.selected) {
    props.refProp?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          props.place.photo
            ? props.place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={props.place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {props.place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(props.place.rating)} readOnly></Rating>
          <Typography gutterBottom variant="subtitle1">
            out of {props.place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {props.place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {props.place.ranking}
          </Typography>
        </Box>
        {props.place?.awards?.map(function (award, index) {
          return (
            <Box
              key={index}
              my={1}
              display="flex"
              justifyContent="space-between"
            >
              <img src={award.images.small} alt={award.display_name} />
              <Typography variant="subtitle1" color="textSecondary">
                {" "}
                {award.display_name}
              </Typography>
            </Box>
          );
        })}
        {props.place?.cuisine?.map(function (cuisine) {
          return (
            <Chip
              key={cuisine.key}
              size="small"
              label={cuisine.name}
              className={classes.chip}
            />
          );
        })}
        {props.place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {props.place?.address}
          </Typography>
        )}
        {props.place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {props.place?.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={function () {
              window.open(props.place.web_url, "_blank");
            }}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={function () {
              window.open(props.place.website, "_blank");
            }}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default PlaceDetails;
