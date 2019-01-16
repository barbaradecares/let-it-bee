import React, { Component } from "react";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordsWithNotes: []
    };
  }

  fetchNotes = () => {
    fetch(
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
    this.fetchNotes();
  }

  handleChange = e => {
    this.setState({ notes: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    ///fix prevent default + patch
  };

  render() {
    function compare(a, b) {
      if (a.created_at < b.created_at) return -1;
      if (a.created_at > b.created_at) return 1;
      return 0;
    }

    let sorted = this.state.recordsWithNotes.sort(compare);

    return (
      <div>
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
            <button onSubmit={e => this.handleSubmit(e)}>Submit</button>
          </form>
        </div>
        <div id="notes">
          {sorted.map(record => {
            return <p>{record.notes}</p>;
          })}
        </div>
      </div>
    );
  }
}
