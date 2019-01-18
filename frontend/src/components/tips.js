import React, { Component } from "react";
import ButtonAppBar from "./buttonAppBar";

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

    this.setState({ lastRecord: last });
  };

  getStatus = () => {};
  render() {
    this.getStatus();
    return (
      <div>
        <h3>Tips and advices</h3>
        <h4>based on hive's status</h4>
      </div>
    );
  }
}
