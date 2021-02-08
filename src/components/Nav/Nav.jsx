import React, { useState } from "react";

import { useLocation, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HistoryIcon from '@material-ui/icons/History';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const linkList = [
    {
      text: "Dashboard",
      icon: <AccountCircleIcon />,
      onClick: () => history.push("/user")
    },
    {
      text: "Meal History",
      icon: <HistoryIcon />,
      onClick: () => history.push("/mealhistory")
    },
    {
      text: "Add Meal",
      icon: <AddCircleIcon />,
      onClick: () => history.push("/addmeal")
    },
    {
      text: "Trends",
      icon: <TimelineIcon />,
      onClick: () => history.push("/trends")
    },
  ]

  const changeTitle = () => {
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
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {linkList.map((item, i) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
          <Divider />
        </List>
      </Drawer>
    </div>
  );
}

export default Nav;
