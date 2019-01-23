import React, { Component } from "react";
import ArcGaugeComponent from "./gages";
import history from "../history";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
      .then(data => history.push("/home"));
  };

  render() {
    console.log(this.state.forecast.summary);
    return (
      <div>
        <Grid container alignItems="center" style={{ minHeight: "100vh" }}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  Live data from {this.state.hive.name}
                </Typography>
                <br />
                <Typography variant="h5">
                  <b>{this.state.hive.location}</b>:{" "}
                  {this.state.forecast.summary}, {this.state.forecast.temp} °F
                </Typography>
                <br />
                <br />
                <ArcGaugeComponent />
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      history.push(
                        `/hive/${this.props.match.params.id}/details`
                      )
                    }
                  >
                    Data
                  </Button>
                  {"    "}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      history.push(`/hive/${this.props.match.params.id}/tips`)
                    }
                  >
                    Tips
                  </Button>
                  {"    "}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      history.push(`/hive/${this.props.match.params.id}/notes`)
                    }
                  >
                    Notes
                  </Button>
                  {"    "}
                  <Button onClick={() => this.deleteHive()}>
                    Delete this hive
                  </Button>
                  <br />
                  <br />
                  <Button onClick={() => history.push("/home")}>Back</Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
