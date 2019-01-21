import React, { Component } from "react";
import HiveCard from "./hiveCard";
import history from "../history";
import Grid from "@material-ui/core/Grid";
import { CardContent, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MyProfile from "./myProfile";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      hives: [],
      fetched: false
    };
  }

  componentDidMount() {
    this.fetchUserInfo();
    this.fetchHives();
  }
  fetchUserInfo = () => {
    fetch(`http://localhost:5000/api/user/${this.props.currentUserId}`, {
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

  fetchHives = () => {
    fetch(`http://localhost:5000/api/user/${this.props.currentUserId}/hives`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => resp.json())
      .then(hives =>
        this.setState(state => {
          state.hives = hives;
          return state;
        })
      )
      .then(() => this.setState({ fetched: true }));
  };

  render() {
    if (localStorage.token) {
      if (this.state.hives.length === 0) {
        return (
          <div>
            <Grid
              container
              spacing={40}
              direction="row"
              justify="center"
              alignItems="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item xs={3} alignItems="center">
                <MyProfile />
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <h4>no hiveeees </h4>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => history.push("/hive/new")}
                    >
                      Add hive
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        );
      } else {
        return (
          <div>
            <Grid
              container
              spacing={40}
              direction="row"
              justify="center"
              alignItems="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item xs={3}>
                <MyProfile />
              </Grid>
              <Grid item xs={8}>
                {/* <Card>
                  <CardContent>
                    <h3>My hives</h3> */}
                <Grid container direction="row" justify="center">
                  {this.state.hives.map(hive => {
                    return <HiveCard hive={hive} />;
                  })}
                </Grid>
                {/* </CardContent>
                </Card> */}
              </Grid>
            </Grid>
          </div>
        );
      }
    } else {
      history.push("/");

      return <div />;
    }
  }
}
