import React, { Component } from "react";
import HiveCard from "./hiveCard";
import history from "../history";
import Grid from "@material-ui/core/Grid";
import { CardContent, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    if (this.state.fetched) {
      if (this.state.hives.length === 0) {
        return (
          <div>
            <h4>no hiveeees </h4>
            <button onClick={() => history.push("/hive/new")}>Add hive</button>
          </div>
        );
      } else {
        return (
          <div>
            <Grid container>
              <Grid item xs={3} />
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <h3>hive's list</h3>
                    {this.state.hives.map(hive => {
                      return (
                        <Grid item xs>
                          <div>
                            <HiveCard hive={hive} />
                          </div>
                        </Grid>
                      );
                    })}
                    <button onClick={() => history.push("/hive/new")}>
                      Add hive
                    </button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        );
      }
    } else {
      return <CircularProgress />;
    }
  }
}
