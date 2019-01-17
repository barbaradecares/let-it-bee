import React, { Component } from "react";
import io from "socket.io-client";
import { ArcGauge, LinearGauge } from "@progress/kendo-react-gauges";
import { timingSafeEqual } from "crypto";

const socket = io("http://10.185.2.139:8000"); //check for ip changes

export default class ArcGaugeComponent extends Component {
  constructor() {
    super();
    this.state = {
      value: 100,
      thermometer: 0,
      hygrometer: 0
    };
  }
  getData() {
    socket.on("report", data => {
      this.setState({ ...data });
    });
  }

  // componentDidMount() {
  // setInterval(() => {
  //   this.setState({
  //     value: Math.ceil(Math.random() * 100)
  //   });
  // }, 1000);
  // console.log(this.state);
  // }

  render = () => {
    this.getData();

    const arcOptions = {
      value: this.state.thermometer,
      colors: [
        { from: 0, to: 25, color: "red" },
        { from: 25, to: 100, color: "red" }
      ]
    };
    const arcOptions2 = {
      value: this.state.hygrometer,
      colors: [
        { from: 0, to: 25, color: "blue" },
        { from: 25, to: 100, color: "blue" }
      ]
    };

    const arcCenterRenderer = (value, color) => {
      return <h3 style={{ color: color }}>Temperature: {value}° F</h3>;
    };

    const arcCenterRenderer2 = (value, color) => {
      return <h3 style={{ color: color }}>Humidity: {value}%</h3>;
    };

    return (
      <div>
        <ArcGauge {...arcOptions} arcCenterRender={arcCenterRenderer} />

        <ArcGauge {...arcOptions2} arcCenterRender={arcCenterRenderer2} />
      </div>
    );
  };
}
