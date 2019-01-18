import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import history from "../history";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  if (localStorage.token) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button
              variant="h6"
              color="inherit"
              className={classes.grow}
              onClick={() => history.push("/home")}
            >
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Let it Bee
              </Typography>
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                history.push(`/user/${localStorage.id}`);
              }}
            >
              My profile
            </Button>

            <Button
              color="inherit"
              onClick={() => {
                localStorage.clear();
                history.push("/");
              }}
            >
              Sign out
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return <div />;
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);