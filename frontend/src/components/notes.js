import React, { Component } from "react";
import history from "../history";
import ButtonAppBar from "./buttonAppBar";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordsWithNotes: [],
      last: {},
      sorted: []
    };
  }

  fetchNotes = () => {
    return fetch(
      `http://localhost:5000/api/hive/${this.props.match.params.id}/records`
    )
      .then(resp => resp.json())
      .then(records =>
        records.map(record => {
          if (record.notes) {
            this.setState(state => {
              state.recordsWithNotes = [...this.state.recordsWithNotes, record];
              return state;
            });
          }
        })
      );
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
    this.fetchNotes().then(() => this.getSortedAndLast());
  }

  handleChange = e => {
    this.setState({ notes: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let newRecord = this.state.last;
    newRecord.notes = this.state.notes;
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

  getSortedAndLast = () => {
    function compare(a, b) {
      if (a.created_at < b.created_at) return -1;
      if (a.created_at > b.created_at) return 1;
      return 0;
    }
    let sorted = this.state.recordsWithNotes.sort(compare);

    let last = sorted[sorted.length - 1];

    this.setState({ sorted, last });
  };

  render() {
    return (
      <div>
        <ButtonAppBar />
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
          {this.state.recordsWithNotes.map(record => {
            return <p>{record.notes}</p>;
          })}
        </div>
      </div>
    );
  }
}
