import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import ButtonAppBar from "./buttonAppBar";
// import { Z_HUFFMAN_ONLY } from "zlib";
// import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import history from "../history";
// new Chart(ctx).Line(data, {
//   bezierCurve: false
// });

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  fetchRecords = () => {
    return fetch(
      `http://localhost:5000/api/hive/${this.props.match.params.id}/records`
    )
      .then(resp => resp.json())
      .then(records => this.setState({ records: records }));
  };

  getLabels = () => {
    let labels = [];
    let temp = [];
    let hum = [];
    let weather = [];
    let formatedTime = [];

    this.state.records.forEach(record => {
      if (record.weather) {
        let date = new Date(record.created_at);
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = `0${month}`;
        }
        let day = date.getDate();
        if (day < 10) {
          day = `0${day}`;
        }

        let formatedString = `${month}/${day}, at ${date.getHours()}:${date.getMinutes()}h`;

        labels.push(record.created_at);
        formatedTime.push(formatedString);
        temp.push(record.temperature);
        hum.push(record.humidity);
        weather.push(record.weather.temp);
      }
    });
    this.setState({
      labels: labels,
      temp: temp,
      hum: hum,
      weather: weather,
      formated: formatedTime
    });
  };

  componentDidMount() {
    this.fetchRecords().then(() => this.getLabels());
  }

  render() {
    console.log(this.state);
    let data = {
      labels: this.state.formated,
      datasets: [
        {
          label: "Temperature",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: this.state.temp,
          borderColor: ["rgba(255,99,132,1)"],
          borderWidth: 1
        },
        {
          label: "Humidity",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: this.state.hum,
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1
        },
        {
          label: "Weather",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: this.state.weather,
          borderColor: ["rgba(255, 159, 64, 1)"],
          borderWidth: 1
        }
      ]
    };

    if (this.state.labels) {
      return (
        <div>
          <Grid container alignItems="center" style={{ minHeight: "100vh" }}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              {" "}
              <Card>
                <CardContent>
                  <h3>Hive's details</h3>
                  <h4>Chart.js record</h4>
                  <Line
                    data={data}
                    width={100}
                    height={50}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                  <Button
                    onClick={() =>
                      history.push(`/hive/${this.props.match.params.id}`)
                    }
                  >
                    Back{" "}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return <CircularProgress />;
    }
  }
}
