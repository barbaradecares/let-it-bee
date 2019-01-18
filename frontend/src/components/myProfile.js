import React, { Component } from "react";
import HiveCard from "./hiveCard";
import history from "../history";
import ButtonAppBar from "./buttonAppBar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class hiveCard extends Component {
  constructor() {
    super();
    this.state = {
      profile: {}
    };
  }
  componentDidMount() {
    this.fetchUserInfo();
  }
  fetchUserInfo = () => {
    fetch(`http://localhost:5000/api/user/${localStorage.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => resp.json())
      .then(profile =>
        this.setState(state => {
          state.profile = profile;
          return state;
        })
      );
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h3>user profile on left size </h3>
                <p>id: {localStorage.id} </p>
                <p>First name:{this.state.profile.firstName}</p>
                <p> Last name: {this.state.profile.lastName}</p>
                <p>E-mail: {this.state.profile.email}</p>
                <button
                  onClick={() => history.push(`/user/${localStorage.id}/edit`)}
                >
                  Edit profile
                </button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
