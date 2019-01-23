import React, { Component } from "react";
import history from "../history";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
export default class hiveCard extends Component {
  render() {
    return (
      <div>
        <Card style={{ width: "250px", margin: "20px" }}>
          <CardContent>
            <Typography variant="h5">
              <b>{this.props.hive.name}</b>
            </Typography>
            <Typography>{this.props.hive.location}</Typography>
            <br />
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
          </CardContent>
        </Card>
      </div>
    );
  }
}
