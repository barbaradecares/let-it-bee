import React, { Component } from "react";
import HiveCard from "./hiveCard";
import history from "../history";
import { Link } from "react-router-dom";
import ButtonAppBar from "./buttonAppBar";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      profile: [],
      hives: []
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
      );
  };

  render() {
    if (this.state.hives.length === 0) {
      return (
        <div>
          <ButtonAppBar />
          <h4>no hiveeees </h4>
          <button onClick={() => history.push("/hive/new")}>Add hive</button>
        </div>
      );
    } else {
      return (
        <div>
          <ButtonAppBar />
          <h3>user profile on left size </h3>
          <p>id: {this.props.currentUserId} </p>
          <p>First name:{this.state.profile.firstName}</p>
          <p> Last name: {this.state.profile.lastName}</p>
          <p>E-mail{this.state.profile.email}</p>
          <button
            onClick={() => history.push(`user/${this.state.profile._id}/edit`)}
          >
            Edit profile
          </button>
          <h3>hive's list</h3>

          {this.state.hives.map(hive => {
            return (
              <div>
                <HiveCard hive={hive} />
              </div>
            );
          })}
          <button onClick={() => history.push("/hive/new")}>Add hive</button>
        </div>
      );
    }
  }
}
