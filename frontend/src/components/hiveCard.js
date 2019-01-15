import React, { Component } from "react";
import history from "../history";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.hive.name}</h4>
        <p>{this.props.hive.location}</p>
        <button
          onClick={() => history.push(`/hive/${this.props.hive._id}/edit`)}
        >
          Edit
        </button>
      </div>
    );
  }
}
