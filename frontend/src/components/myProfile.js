import React, { Component } from "react";
import HiveCard from "./hiveCard";
import history from "../history";
import ButtonAppBar from "./buttonAppBar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import "./hiveCard.css";

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
        {/* <Grid container>
          <Grid item xs={3} />
          <Grid item xs={6}> */}
        <div className="card">
          {/* <CardContent> */}
          <Grid container justify="center" alignItems="center">
            <Avatar
              src="../images/bes.jpg"
              style={{ margin: 27, width: 180, height: 180 }}
            />
          </Grid>
          <p style={{ fontSize: "26px", margin: "20px" }}>
            <b style={{ color: "#faed26" }}>Welcome </b>{" "}
            {this.state.profile.firstName}
          </p>

          {/* <p style={{ fontSize: "17px" }}>
            <b style={{ color: "#faed26" }}>First name:</b>{" "}
            {this.state.profile.firstName}
          </p>
          <p style={{ fontSize: "17px" }}>
            <b style={{ color: "#faed26" }}>Last name:</b>{" "}
            {this.state.profile.lastName}
          </p>
          <p style={{ fontSize: "17px" }}>
            <b style={{ color: "#faed26" }}> E-mail: </b>{" "}
            {this.state.profile.email}
          </p> */}

          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => history.push("/hive/new")}
          >
            Add hive
          </Button>
          <Button
            // variant="outlined"
            size="small"
            color="secondary"
            // className={classes.margin}
            onClick={() => history.push(`/user/${localStorage.id}/edit`)}
          >
            Edit profile
          </Button>
          {/* </CardContent> */}
        </div>
        {/* </Grid> */}
        {/* </Grid> */}
      </div>
    );
  }
}
