import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import history from "../history";
import Home from "./home";

export default class addHive extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "", lat: "", lng: "", name: "" };
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

  createHive = e => {
    e.preventDefault();

    fetch("http://localhost:5000/api/hive/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.id,
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
    return (
      <div>
        <form>
          Hive's name:{" "}
          <input
            id="name"
            onChange={e => this.handleNameChange(e.target.value)}
          />
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
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
          <button onClick={this.createHive}>Add hive</button>
        </form>
      </div>
    );
  }
}
