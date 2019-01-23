import React, { Component } from "react";
import history from "../history";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
export default class editProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    fetch(`http://localhost:5000/api/user/${this.props.match.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => resp.json())
      .then(profile =>
        this.setState(state => {
          state = profile;
          return state;
        })
      );
  }

  handleChange = e => {
    this.setState(e);
  };

  handleSubmit = e => {
    e.preventDefault();
    let profile = this.state;
    fetch(`http://localhost:5000/api/user/${this.props.match.params.id}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(profile)
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          alert(result.error);
        } else {
          history.push("/home");
        }
      });
  };

  render() {
    return (
      <div>
        <Grid container alignItems="center" style={{ minHeight: "100vh" }}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h1>Edit profile</h1>
                <form>
                  <p>
                    <TextField
                      id="firstName"
                      value={this.state.firstName}
                      helperText="First Name"
                      margin="normal"
                      onChange={e => {
                        this.handleChange({ firstName: e.target.value });
                      }}
                    />
                  </p>
                  <p>
                    <TextField
                      id="lastName"
                      value={this.state.lastName}
                      helperText="Last Name"
                      margin="normal"
                      onChange={e => {
                        this.handleChange({ lastName: e.target.value });
                      }}
                    />{" "}
                  </p>
                  <p>
                    <TextField
                      id="email"
                      value={this.state.email}
                      helperText="E-mail"
                      margin="normal"
                      onChange={e => {
                        this.handleChange({ email: e.target.value });
                      }}
                    />
                  </p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={e => this.handleSubmit(e)}
                  >
                    Edit profile
                  </Button>
                  <Button onClick={() => history.push("/home")}>Back</Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
