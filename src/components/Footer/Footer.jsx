// React, Router
import React from "react";
import { Link as RouterLink } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

// MUI styling
const useStyles = makeStyles({
  root: {
    marginTop: 40,
    padding: 20,
    textAlign: "center",
    left: 0,
    bottom: 0,
    right: 0,
  },
});

function Footer() {

  const classes = useStyles();

  return (
    <footer className={classes.root}>
      &copy; foodCost --{" "}
      <Link component={RouterLink} color="inherit" to="/about">
        About
      </Link>
    </footer>
  );
}

export default Footer;
