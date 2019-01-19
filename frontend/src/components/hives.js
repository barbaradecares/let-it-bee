import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Details from "./details";
import Tips from "./tips";
import AddHive from "./addHive";
import EditHive from "./editHive";
import Notes from "./notes";
import HiveHomePage from "./hiveHomePage";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Hives extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount = () => {
    console.log("mounted");
    fetch(`http://localhost:5000/api/hive/${this.props.match.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => resp.json())
      .then(hive => {
        console.log(hive);
        this.setState(state => {
          state.hive = hive;
          return state;
        });
      });
  };

  render() {
    // console.log(
    //   this.state,
    //   this.props.currentUserId,
    //   this.props.match.params.id
    // );
    // debugger;
    if (this.state.hive) {
      if (this.state.hive.userId == this.props.currentUserId) {
        return (
          <>
            <Switch>
              <Route
                exact
                path={`${this.props.match.path}/edit`}
                component={props => <EditHive {...props} />}
              />
              <Route
                exact
                path={`${this.props.match.path}/notes`}
                component={props => <Notes {...props} />}
              />
              <Route
                exact
                path={`${this.props.match.path}`}
                component={props => <HiveHomePage {...props} />}
              />
              <Route
                exact
                path={`${this.props.match.path}/details`}
                component={props => <Details {...props} />}
              />
              <Route
                exact
                path={`${this.props.match.path}/tips`}
                component={props => <Tips {...props} />}
              />
            </Switch>
          </>
        );
      } else {
        return <Redirect to={"/home"} />;
      }
    } else {
      return <CircularProgress />;
    }
  }
}
