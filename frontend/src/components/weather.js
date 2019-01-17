import React, { Component } from "react";
import buttonAppBar from "./buttonAppBar";
export default class Weather extends Component {
  render() {
    return (
      <div>
        <h3>Weather forecast</h3>
        <h4>fetched from API</h4>
      </div>
    );
  }
}
