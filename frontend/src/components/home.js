import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>user profile on left size {this.props.currentUserId}</h3>
        <h4>hive's list with edit name and location feature</h4>
      </div>
    );
  }
}
