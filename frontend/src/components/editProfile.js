import React, { Component } from "react";
import history from "../history";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
export default class editProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    fetch(`http://localhost:5000/api/user/${this.props.match.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => resp.json())
      .then(profile =>
        this.setState(state => {
          state = profile;
          return state;
        })
      );
  }

  handleChange = e => {
    this.setState(e);
  };

  handleSubmit = e => {
    e.preventDefault();
    let profile = this.state;
    fetch(`http://localhost:5000/api/user/${this.props.match.params.id}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(profile)
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          alert(result.error);
        } else {
          history.push("/home");
        }
      });
  };

  render() {
    return (
      <div>
        <Grid container alignItems="center" style={{ minHeight: "100vh" }}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h1>Edit profile</h1>
                <form>
                  <p>
                    First name:{" "}
                    <input
                      id="firstName"
                      value={this.state.firstName}
                      onChange={e => {
                        this.handleChange({ firstName: e.target.value });
                      }}
                    />
                  </p>
                  <p>
                    Last name:{" "}
                    <input
                      id="lastName"
                      value={this.state.lastName}
                      onChange={e => {
                        this.handleChange({ lastName: e.target.value });
                      }}
                    />{" "}
                  </p>
                  <p>
                    E-mail:{" "}
                    <input
                      id="email"
                      value={this.state.email}
                      onChange={e => {
                        this.handleChange({ email: e.target.value });
                      }}
                    />{" "}
                  </p>
                  <button onClick={e => this.handleSubmit(e)}>
                    Edit profile
                  </button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
