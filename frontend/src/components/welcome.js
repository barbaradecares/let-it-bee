import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddHive from "./addHive";
import history from "../history";
import { CardContent, Card } from "@material-ui/core";

export default class Welcome extends Component {
  render() {
    if (!localStorage.token) {
      return (
        <div>
          <img src="../images/main.jpg" width="100%" />
          <Card style={{ opacity: 0.7 }}>
            <h3>welcome page</h3>
            <h4>sign in / sign up buttons</h4>
            <Link to={"/login"}>Log in</Link>
            <Link to={"/signup"}>Sign up</Link>
          </Card>
        </div>
      );
    } else {
      history.push("/home");
      return <div />;
    }
  }
}
