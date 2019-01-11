import React, { Component } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

export default class Home extends Component {
  render() {
    console.log(socket);
    return (
      <div>
        {/* <div id="thermometer" class="gauge" />
        <div id="hygrometer" class="gauge" />
        <script src="/socket.io/socket.io.js" />
        <script src="/vendor/justgage/justgage.js" />
        <script src="/vendor/justgage/raphael-2.1.4.min.js" /> */}
      </div>
    );
  }
}
