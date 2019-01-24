import React, { Component } from "react";
import "./hiveCard.css";
import history from "../history";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {
  Typography,
  CardMedia,
  CardActionArea,
  CardActions
} from "@material-ui/core";

let imageDisplayed;

export default class hiveCard extends Component {
  render() {
    switch (this.props.hive.location) {
      case "Anchorage, AK, USA":
        imageDisplayed = require("/Users/barbaradecares/Development/let-it-bee/frontend/src/components/alaska.jpeg");
        break;
      case "Santos, SP, Brazil":
        imageDisplayed = require("/Users/barbaradecares/Development/let-it-bee/frontend/src/components/santos.jpg");
        break;
      case "Tallahassee, FL":
        imageDisplayed = require("/Users/barbaradecares/Development/let-it-bee/frontend/src/components/tallahassee.jpg");
        break;
      case "Houston, TX, USA":
        imageDisplayed = require("/Users/barbaradecares/Development/let-it-bee/frontend/src/components/houston.jpg");
        break;

      default:
        imageDisplayed = require("/Users/barbaradecares/Development/let-it-bee/frontend/src/components/default.jpg");
        break;
    }
    return (
      <div className="card">
        <img
          src={imageDisplayed}
          alt="Avatar"
          style={{ width: "100%", height: "170px" }}
        />
        <div className="container">
          <h2>
            <b>{this.props.hive.name.toUpperCase()}</b>
          </h2>
          <p>{this.props.hive.location}</p>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => history.push(`/hive/${this.props.hive._id}`)}
        >
          + Info
        </Button>
        <Button
          size="small"
          onClick={() => history.push(`/hive/${this.props.hive._id}/edit`)}
        >
          Edit
        </Button>
      </div>
    );
  }
}
{
  /* <Card style={{ maxWidth: "300px", margin: "20px" }}> */
}
{
  /* <CardActionArea>
            <CardMedia
              // style={{ height: "140" }}
              // className={classes.media}
              // image="./alaska.jpg"
              // src="https://cdn.history.com/sites/2/2013/11/alaska-mt-mckinley-P.jpeg"
            />
            <CardContent>
              <Typography variant="h5">
                <b>{this.props.hive.name}</b>
              </Typography>
              <Typography>{this.props.hive.location}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => history.push(`/hive/${this.props.hive._id}`)}
            >
              + Info
            </Button>
            <Button
              size="small"
              onClick={() => history.push(`/hive/${this.props.hive._id}/edit`)}
            >
              Edit
            </Button>
          </CardActions> */
}
{
  /* </CardActionArea> */
}
{
  /* </Card> */
}
