import React, { Component } from "react";
import buttonAppBar from "./buttonAppBar";
export default class Weather extends Component {
  constructor(){
    super()
    this.state = {
      weather = {}
    }
  }

  componentDidMount(){
    
      var apiKey = "88440f3a1e59807fd6f14245a2e3346c",
        url = "https://api.darksky.net/forecast/",
        lati = hive.lat,
        longi = hive.lng,
        api_call = url + apiKey + "/" + lati + "," + longi;
    
      var clientServerOptions = {
        uri: api_call,
        body: JSON.stringify({}),
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      
  }
  render() {

    return (
      <div>
        <h3>Weather forecast</h3>
        <h4>fetched from API</h4>
      </div>
    );
  }
}
