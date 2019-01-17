import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ButtonAppBar from "./buttonAppBar";
var data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90]
    }
  ]
};
// var myLineChart = new Chart(ctx).Line(data, options);

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

  componentDidMount() {
    this.fetchRecords();
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <ButtonAppBar />
        <Card>
          <CardContent>
            <h3>Hive's details</h3>
            <h4>Chart.js record</h4>
            <Line data={data} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
