import React, { Component } from "react";
import history from "../history";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
export default class hiveCard extends Component {
  render() {
    return (
      <div>
        <Card style={{ width: "250px", margin: "20px" }}>
          <CardContent>
            <h4>{this.props.hive.name}</h4>
            <p>{this.props.hive.location}</p>
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
