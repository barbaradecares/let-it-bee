import React, { Component } from "react";
import logo from "./logo.svg";
import Login from "./components/login";
import Home from "./components/home";
import "./App.css";
import { stat } from "fs";
import SignUp from "./components/signup";
import { Route, Switch, Redirect } from "react-router-dom";
import Welcome from "./components/welcome";
import history from "./history";
import AddHive from "./components/addHive";
import EditHive from "./components/editHive";
import EditProfile from "./components/editProfile";

export default class App extends Component {
  constructor(props) {
    super(props);
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
    // console.log(e);
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
      .then(res => {
        if (res.status == 401) {
          console.log("401");
        } else {
          return res.json();
        }
      })
      .then(result => {
        console.log(result);
        if (result) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("id", result.id);
          history.push("/home");
          this.setState({ currentUserId: result.id });
        } else {
          alert("Wrong username or password");
        }
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
        if (result.error) {
          alert(result.error);
        } else {
          localStorage.setItem("token", result.token);
          localStorage.setItem("id", result.id);
          this.setState({ currentUserId: result.id });
          history.push("/hive/new");
        }
      });
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route
          exact
          path="/login"
          component={() => <Login login={this.login} />}
        />
        <Route
          exact
          path="/signup"
          component={() => <SignUp signup={this.signup} />}
        />
        <Route
          exact
          path="/home"
          component={() => (
            <Home
              currentUserId={this.state.currentUserId}
              redirectToEdit={this.redirectToEdit}
            />
          )}
        />
        <Route
          exact
          path="/hive/new"
          component={() => <AddHive currentUserId={this.state.currentUserId} />}
        />
        <Route
          exact
          path="/hive/:id/edit"
          component={props => <EditHive {...props} />}
        />
        <Route
          exact
          path="/user/:id/edit"
          component={props => <EditProfile {...props} />}
        />
      </Switch>
    );
  }
}
