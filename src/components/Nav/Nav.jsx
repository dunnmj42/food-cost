import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
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
        case "/mealdetails":
          return "Meal Details";
        case "/mealedit":
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
      <AppBar position="static">
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
      <NavDrawer open={open} setOpen={setOpen}/>
    </div>
  );
}

export default Nav;
