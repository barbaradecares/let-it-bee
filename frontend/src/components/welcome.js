import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddHive from "./addHive";

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <h3>welcome page</h3>
        <h4>sign in / sign up buttons</h4>
        <Link to={"/login"}>Log in</Link>
        <Link to={"/signup"}>Sign up</Link>
        <AddHive />
      </div>
    );
  }
}
