import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import history from "../history";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class Instructions extends React.Component {
  render() {
    return (
      <div>
        <Grid container alignItems="center" style={{ minHeight: "100vh" }}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h3>Congratulations on your new acquisition!</h3>
                <form onSubmit={() => history.push("/hive/new/form")}>
                  <p>
                    Enter your Let it bee kit id: <br />
                    <TextField variant="outlined" color="primary" />
                  </p>
                  <Button variant="contained" color="primary" type={"submit"}>
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
