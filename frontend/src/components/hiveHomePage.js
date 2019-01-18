import React, { Component } from "react";
import ArcGaugeComponent from "./gages";
import history from "../history";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class HiveHomePage extends Component {
  constructor() {
    super();
    this.state = {
      hive: {},
      forecast: {}
    };
  }
  componentDidMount() {
    // fetch(`http://localhost:5000/api/hive/${this.props.match.params.id}`)
    //   .then(resp => resp.json())
    //   .then(hive => this.setState({ hive: hive }))
    //   .then(() => {
    fetch(
      `http://localhost:5000/api/hive/${this.props.match.params.id}/weather`
    )
      .then(res => res.json())
      .then(data => this.setState({ hive: data.hive, forecast: data.weather }));
  }
  // console.log("hii");
  deleteHive = () => {
    fetch(`http://localhost:5000/api/hive/${this.state.hive._id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => console.log("deleted this", data));
  };

  render() {
    console.log(this.state.forecast.summary);
    return (
      <div>
        <Card>
          <CardContent>
            <h3>Hive home page</h3>
            <h4>{this.state.hive.name}</h4>
            <h5>
              with links to weather, graphs, notes and green/red light
              indicating health status of hive
            </h5>
            <h1>
              The weather in {this.state.hive.location} is:{" "}
              {this.state.forecast.summary}, {this.state.forecast.temp}
            </h1>
            <ArcGaugeComponent />

            <button
              onClick={() =>
                history.push(`/hive/${this.props.match.params.id}/details`)
              }
            >
              Data
            </button>
            <button
              onClick={() =>
                history.push(`/hive/${this.props.match.params.id}/tips`)
              }
            >
              Tips
            </button>
            <button
              onClick={() =>
                history.push(`/hive/${this.props.match.params.id}/notes`)
              }
            >
              Notes
            </button>
            <button onClick={() => this.deleteHive()}>Delete this hive</button>
          </CardContent>
        </Card>
      </div>
    );
  }
}
