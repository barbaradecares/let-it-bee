import React, { Component } from "react";
import logo from "./logo.svg";
import Login from "./components/login";
import Home from "./components/home";
import "./App.css";
import { stat } from "fs";
import SignUp from "./components/signup";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUserId: localStorage.id,
      register: false
    };
  }

  toggleRegister = () => {
    this.setState(state => {
      state.register = !state.register;
      return state;
    });
  };
  login = e => {
    e.preventDefault();
    fetch("http://localhost:5000/api/user/signin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value
      })
    })
      .then(res => res.json())
      .then(result => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("id", result.id);
        this.setState({ currentUserId: result.id });
      });
  };

  logout = () => {
    localStorage.clear();
    this.setState({ currentUserId: null });
  };

  signup = e => {
    e.preventDefault();
    fetch("http://localhost:5000/api/user/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("id", result.id);
        this.setState({ currentUserId: result.id });
      });
  };

  render() {
    return (
      <div className="container">
        {localStorage.token ? (
          <Home userId={this.state.currentUserId} logout={this.logout} />
        ) : this.state.register ? (
          <SignUp signin={this.toggleRegister} signup={this.signup} />
        ) : (
          <Login login={this.login} signup={this.toggleRegister} />
        )}
      </div>
    );
  }
}

export default App;
