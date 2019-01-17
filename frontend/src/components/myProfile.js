import React, { Component } from "react";
import HiveCard from "./hiveCard";
import history from "../history";
import ButtonAppBar from "./buttonAppBar";

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

  render() {
    return (
      <div>
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
      </div>
    );
  }
}
