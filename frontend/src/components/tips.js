import React, { Component } from "react";
import ButtonAppBar from "./buttonAppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
export default class Tips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      hive: {},
      lastRecord: {}
    };
  }
  componentDidMount() {
    this.fetchHive();
    this.fetchRecords().then(() => this.getLast());
  }

  fetchHive = () => {
    fetch(`http://localhost:5000/api/hive/${this.props.match.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => resp.json())
      .then(hive =>
        this.setState(state => {
          state.hive = hive;
          return state;
        })
      );
  };

  fetchRecords = () => {
    return fetch(
      `http://localhost:5000/api/hive/${this.props.match.params.id}/records`
    )
      .then(resp => resp.json())
      .then(records => this.setState({ records: records }));
  };

  getLast = () => {
    function compare(a, b) {
      if (a.created_at < b.created_at) return -1;
      if (a.created_at > b.created_at) return 1;
      return 0;
    }
    let sorted = this.state.records.sort(compare);

    let last = sorted[sorted.length - 1];
    let humStatus;
    let tempStatus;

    if (last) {
      if (last.humidity < 50) {
        humStatus = "low";
      } else if (last.humidity >= 50 && last.humidity < 70) {
        humStatus = "ideal";
      } else humStatus = "high";

      if (last.temperature < 10) {
        tempStatus = "low";
      } else if (last.temperature >= 10 && last.temperature < 50) {
        tempStatus = "ideal";
      } else {
        tempStatus = "high";
      }
    }
    this.setState({
      lastRecord: last,
      humStatus: humStatus,
      tempStatus: tempStatus
    });
  };

  render() {
    if (this.state.lastRecord) {
      switch (this.state.humStatus) {
        case "high":
          return (
            <div>
              <Card>
                <CardContent>
                  {/* <h1>Tips</h1>
                  <h3>Humidity: {this.state.lastRecord.humidity} %</h3>
                  <h3>Temperature: {this.state.lastRecord.temperature} F</h3> */}
                  <h1>Your hive's humidity is too high!</h1>
                  <p> Pay attention to your hive's ventilation.</p>
                  <p>
                    You could have a overpopulation in this hive. Lots of bees
                    mean lots of respiration and also lots of nectar collection.
                    Everything, it seems, gives off moisture.
                  </p>
                  <p>
                    Moisture in the hive is not a good thing. Disease organisms,
                    fungi, and molds thrive in moist environments and, in cold
                    weather, water droplets can drip down on the bees and chill
                    the brood. Proper ventilation is important for bee colonies
                    year round. Bees can do really well in cold temperatures,
                    but cold and wet is a different story.
                  </p>
                  <p>
                    You probably want to improve this hive's airflow with more
                    than one air entrance.
                  </p>
                </CardContent>
              </Card>
            </div>
          );
          break;
        case "low":
          return (
            <div>
              <Card>
                <CardContent>
                  <h1>Your hive's humidity is below the healthy average!</h1>
                  <p>
                    Numerous studies have demonstrated that either high or low
                    levels of humidity affect the health of the brood and adult
                    bees directly.{" "}
                  </p>
                  <p>
                    At levels below 50% of relative humidity in the brood cells
                    no eggs hatch, this being particularly relevant for small
                    nuclei, or indirectly by favouring the development of
                    pathologies.
                  </p>
                  <p>You should check for a possible swarm.</p>
                </CardContent>
              </Card>
            </div>
          );
          break;
        default:
          return (
            <div>
              <Card>
                <CardContent>
                  <h1>
                    The data collected from his hive indicates that your hive is
                    healthy!
                  </h1>
                </CardContent>
              </Card>
            </div>
          );
          break;
      }
    } else {
      return (
        <div>
          {" "}
          <Card>
            <CardContent>
              <h1>
                Couldn't collect enough data. Please make sure that you "Let it
                Bee" equipment is correctly installed and operating.
              </h1>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
}
