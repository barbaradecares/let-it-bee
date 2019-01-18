import React, { Component } from "react";
import history from "../history";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const divStyle = {
  margin: "40px",
  width: "70%"
};
export default class hiveCard extends Component {
  render() {
    return (
      <div style={divStyle}>
        <Card>
          <CardContent>
            <h4>{this.props.hive.name}</h4>
            <p>{this.props.hive.location}</p>

            <button
              onClick={() => history.push(`/hive/${this.props.hive._id}/edit`)}
            >
              Edit
            </button>
            <button
              onClick={() => history.push(`/hive/${this.props.hive._id}`)}
            >
              See hive
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }
}
