import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import history from "./history";

ReactDOM.render(
  <Router history={history}>
    <div className={"background"}>
      <App />
    </div>
  </Router>,
  document.getElementById("root")
);
// document.body.style.background = "#FFFFFF";
document.body.style.backgroundImage = "url(/images/37436-655d18.svg)";
// document.querySelector(".background").style.background = "#FDD835";
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
