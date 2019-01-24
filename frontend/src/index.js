import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import history from "./history";

ReactDOM.render(
  <Router history={history}>
    <div className="greyBackground">
      <div
        style={{
          backgroundImage: "url(/images/yellow.svg)",
          minHeight: "1100px"
        }}
      >
        <div className={"background"}>
          <App />
        </div>
      </div>
    </div>
  </Router>,
  document.getElementById("root")
);
document.body.style.background = "#46344E";
// document.body.style.backgroundImage = "url(/images/yellow.svg)";
// document.querySelector(".background").style.background = "#FDD835";
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
