import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.hive.name}</h4>
        <p>{this.props.hive.location}</p>
        <p>edit button</p>
      </div>
    );
  }
}
