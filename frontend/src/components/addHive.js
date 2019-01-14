import React, { Component } from "react";

export default class AddHive extends Component {
  render() {
    return (
      <div>
        <div>
          <h3>Add hive form</h3>
          <h4> with instructions for setting up</h4>
          <form method="get" className="form">
            <ul className="list-reset">
              <li className="form-field">
                <label htmlFor="city-search">Hive's Name</label>
                <input
                  type="text"
                  id="hives-name"
                  placeholder="e.g. My first hive"
                />
              </li>
              <li className="form-field">
                <label htmlFor="city-search">Hive's location</label>
                <input
                  type="text"
                  id="city-search"
                  placeholder="e.g. Houston, TX"
                />
              </li>
              <li className="form-field">
                <input type="checkbox" id="celsius" />
                <label htmlFor="celsius">Report Celsius</label>
              </li>
            </ul>
            <button>Get Weather</button>
          </form>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js">
            &lt;script
            src="https://cdnjs.cloudflare.com/ajax/libs/skycons/1396634940/skycons.min.js"
            /&gt; &lt;script type="text/javascript" src="./config.js" /&gt;
            &lt;script src="./searchBox.js" /&gt;
          </script>
        </div>
      </div>
    );
  }
}
