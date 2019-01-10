import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Welcome extends Component {
  //   signIn = () => {
  //     return <Login />;
  //   };
  render() {
    return (
      <div>
        <h3>welcome page</h3>
        <h4>sign in / sign up buttons</h4>
        <Link to={"/login"}>Log in</Link>
        <Link to={"/signup"}>Sign up</Link>
      </div>
    );
  }
}
