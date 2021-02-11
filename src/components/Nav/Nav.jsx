import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// app bar imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// discrete component
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
        case "/details":
          return "Meal Details";
        case "/edit":
          return "Edit Meal";
        case "/trends":
          return "Personal Trends";
        default:
          return "FoodCost";
      }
    } else {
      return "FoodCost";
    }
  };

  let title = changeTitle();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <NavDrawer open={open} setOpen={setOpen}/>
    </div>
  );
}

export default Nav;
