import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import history from "../history";
import Home from "./home";

export default class editHive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.currentHive.location,
      lat: this.props.currentHive.latitude,
      lng: this.props.currentHive.longitude,
      name: this.props.currentHive.name
    };
  }

  handleChange = address => {
    this.setState({ address: address });
  };

  handleSelect = address => {
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

    fetch(`{http://localhost:5000/api/hive/${this.props.currentHiveId}/edit}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        userId: this.props.currentUserId,
        name: this.state.name,
        lat: this.state.lat,
        lng: this.state.lng,
        location: this.state.address
      })
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
    console.log(this.props.currentHive);
    return (
      <div>
        <form>
          Hive's name:{" "}
          <input
            value={this.state.name}
            id="name"
            onChange={e => this.handleNameChange(e.target.value)}
            value={this.state.name}
          />
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            value={this.state.address}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                Hive's location{" "}
                <input
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
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
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
          <button onClick={this.editHive}>Edit hive</button>
        </form>
      </div>
    );
  }
}
