import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import history from "../history";

export default class Instructions extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <h3>Congratulations on your new acquisition!</h3>
            <form onSubmit={() => history.push("/hive/new/form")}>
              <p>
                Enter your Let it bee kit id: <input />
              </p>
              <button type={"submit"}>Submit</button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}
