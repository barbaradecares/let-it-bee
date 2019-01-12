import React, { Component } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

export default class Home extends Component {
  render() {
    console.log(socket);
    return <div />;
  }
}
