import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import NavDrawer from "../NavDrawer/NavDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav() {
  const classes = useStyles();
  const location = useLocation();

  const user = useSelector((store) => store.user);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    if (user.id != null) {
      setOpen(true);
    }
  };

  const pathStr = /[a-z\/]/gi;
  const pathId = location.pathname.replace(pathStr, "");

  const changeTitle = () => {
    if (user.id != null) {
      switch (location.pathname) {
        case "/user":
          return "Dashboard";
        case "/about":
          return "About";
        case "/mealhistory":
          return "Meal History";
        case "/addmeal":
          return "Add Meal";
        case `/details/${pathId}`:
          return "Meal Details";
        case `/edit/${pathId}`:
          return "Edit Meal";
        case "/trends":
          return "Personal Trends";
        default:
          return "foodCost";
      }
    } else {
      return "foodCost";
    }
  };

  let title = changeTitle();

  return (
    <div className={classes.root}>
      <AppBar color="secondary">
        <Toolbar>
          {user.id ? (
            <>
              <IconButton
                onClick={handleDrawerOpen}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" className={classes.title}>
                {title}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" className={classes.title}>
              <center>{title}</center>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <NavDrawer open={open} setOpen={setOpen} />
    </div>
  );
}

export default Nav;
