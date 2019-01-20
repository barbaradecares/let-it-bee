import React, { Component } from "react";
import history from "../history";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordsWithNotes: [],
      last: {},
      sorted: [],
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
  componentDidMount() {
    this.fetchHive();
    this.fetchRecords().then(() => this.getSorted());
  }

  handleChange = e => {
    this.setState({ notes: e.target.value });
  };

  handleSubmit = e => {
    let newRecord = {};
    e.preventDefault();
    if (this.state.records.length > 0) {
      newRecord = this.state.records[0];
      newRecord.notes = this.state.notes;
    } else {
      newRecord.notes = this.state.notes;
      newRecord.hiveId = this.state.hive._id;
    }

    newRecord.created_at = Date.now();

    console.log(newRecord);
    fetch("http://localhost:5000/api/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newRecord)
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          alert(result.error);
        } else {
          history.push(`/hive/${this.state.hive._id}/notes`);
        }
      });
  };

  getSorted = () => {
    function compare(a, b) {
      if (a.created_at > b.created_at) return -1;
      if (a.created_at < b.created_at) return 1;
      return 0;
    }
    let sorted = this.state.records.sort(compare);
    this.setState({ records: sorted });

    // this.state.records.map(record => {
    //   if (record.notes) {
    //     this.setState(state => {
    //       state.recordsWithNotes = [...this.state.recordsWithNotes, record];
    //       return state;
    //     });
    //   }
    // });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Card>
          <CardContent>
            <h3>Notes page</h3>
            <h4>hive's notes and add note form</h4>

            <div>
              <h3>Add note: + display current stats</h3>
              <form>
                <p>Add note: </p>
                <textarea
                  onChange={e => this.handleChange(e)}
                  value={this.state.notes}
                />
                <button onClick={e => this.handleSubmit(e)}>Submit</button>
              </form>
            </div>
            <div id="notes">
              {this.state.records.map(record => {
                if (record.notes) {
                  let date = new Date(record.created_at);

                  let month = date.getMonth() + 1;
                  if (month < 10) {
                    month = `0${month}`;
                  }
                  let day = date.getDate();
                  if (day < 10) day = `0${day}`;

                  let formatedString = `${month}/${day}, at ${date.getHours()}:${date.getMinutes()}h`;
                  return (
                    <Card>
                      <CardContent>
                        {record.notes}
                        <div style={{ textAlign: "right" }}>
                          {formatedString}
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
