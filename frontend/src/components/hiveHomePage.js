import React, { Component } from "react";
import ArcGaugeComponent from "./gages";
import history from "../history";
import ButtonAppBar from "./buttonAppBar";

export default class HiveHomePage extends Component {
  constructor() {
    super();
    this.state = {
      hive: {}
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
      .then(forecast => console.log(forecast));
  }
  // console.log("hii");
  render() {
    // console.log(this.state);
    return (
      <div>
        <h3>Hive home page</h3>
        <h4>
          with links to weather, graphs, notes and green/red light indicating
          health status of hive
        </h4>
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
      </div>
    );
  }
}
