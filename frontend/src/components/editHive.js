import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import history from "../history";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
export default class editHive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    fetch(`http://localhost:5000/api/hive/${this.props.match.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => resp.json())
      .then(hive =>
        this.setState(state => {
          state = hive;
          return state;
        })
      );
  }

  handleChange = address => {
    this.setState({ location: address });
  };

  handleSelect = address => {
    this.setState({ location: address });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ lat: latLng.lat, lng: latLng.lng });
        console.log("Success", latLng);
      })
      .catch(error => console.error("Error", error));
  };

  handleNameChange = name => {
    this.setState({ name: name });
  };

  editHive = e => {
    e.preventDefault();
    let hive = this.state;
    fetch(`http://localhost:5000/api/hive/${this.props.match.params.id}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(hive)
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
                <Typography variant="h3">Edit hive</Typography> <br /> <br />
                <form>
                  {" "}
                  <TextField
                    helperText="Hive's name"
                    value={this.state.name}
                    id="name"
                    onChange={e => this.handleNameChange(e.target.value)}
                    value={this.state.name}
                  />
                  <br />
                  <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    value={this.state.location}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading
                    }) => (
                      <div>
                        <br />
                        <TextField
                          helperText="Hive's location"
                          // label="Hive's name"
                          {...getInputProps({
                            placeholder: "Search Places ...",
                            className: "location-search-input"
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "#fafafa",
                                  cursor: "pointer"
                                }
                              : {
                                  backgroundColor: "#ffffff",
                                  cursor: "pointer"
                                };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.editHive}
                  >
                    Edit hive
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
