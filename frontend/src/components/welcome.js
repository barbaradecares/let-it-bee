import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainPhoto from "./mainPhoto";
import history from "../history";
import { CardContent, Card } from "@material-ui/core";
// import ButtonBase from "@material-ui/core/ButtonBase";

export default class Welcome extends Component {
  render() {
    if (!localStorage.token) {
      return (
        <div>
          <MainPhoto />
        </div>
      );
    } else {
      history.push("/home");
      return <div />;
    }
  }
}
