import React, { Component } from "react";

export default class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h4>{this.props.hive.name}</h4>
        <p>{this.props.hive.location}</p>
        <button onClick={() => this.props.redirectToEdit(this.props.hive)}>
          Edit
        </button>
      </div>
    );
  }
}
