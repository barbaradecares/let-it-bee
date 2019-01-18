import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Details from "./details";
import Tips from "./tips";
import AddHive from "./addHive";
import EditHive from "./editHive";
import Notes from "./notes";
import HiveHomePage from "./hiveHomePage";

export default class Hives extends Component {
  componentWillMount() {
    this.props.match.params.id;
  }

  render() {
    if (this.state.hive.userId == this.props.currentUserId) {
      return (
        <>
          <Switch>
            <Route
              exact
              path={`${this.props.match.path}/new`}
              component={() => (
                <AddHive currentUserId={this.props.currentUserId} />
              )}
            />
            <Route
              exact
              path={`${this.props.match.path}/:id/edit`}
              component={props => <EditHive {...props} />}
            />
            <Route
              exact
              path={`${this.props.match.path}/:id/notes`}
              component={props => <Notes {...props} />}
            />
            <Route
              exact
              path={`${this.props.match.path}/:id`}
              component={props => <HiveHomePage {...props} />}
            />
            <Route
              exact
              path={`${this.props.match.path}/:id/details`}
              component={props => <Details {...props} />}
            />
            <Route
              exact
              path={`${this.props.match.path}/:id/tips`}
              component={props => <Tips {...props} />}
            />
          </Switch>
        </>
      );
    }
  }
}
