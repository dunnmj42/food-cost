import React, { useState } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

// app bar imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// drawer imports
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HistoryIcon from "@material-ui/icons/History";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TimelineIcon from "@material-ui/icons/Timeline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// dialog imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


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
  fixedFooter: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Nav() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [logout, setLogout] = useState(false);

  const handleDrawerOpen = () => {
    if(user.id != null) {
      setOpen(true);
    }
  };

  const handleDrawerClose = () => {
    if(user.id != null) {
      setOpen(false);
    }
  };

  const handleLogoutOpen = () => {
    setLogout(true);
  };

  const handleLogout = () => {
    setLogout(false);
    dispatch({ type: 'LOGOUT' })
  };

  const handleLogoutCancel = () => {
    setLogout(false);
  }

  const linkList = [
    {
      text: "Dashboard",
      icon: <AccountCircleIcon />,
      onClick: () => history.push("/user"),
    },
    {
      text: "Meal History",
      icon: <HistoryIcon />,
      onClick: () => history.push("/mealhistory"),
    },
    {
      text: "Add Meal",
      icon: <AddCircleIcon />,
      onClick: () => history.push("/addmeal"),
    },
    {
      text: "Trends",
      icon: <TimelineIcon />,
      onClick: () => history.push("/trends"),
    },
  ];

  const changeTitle = () => {
    if(user.id != null) {
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
      return "FoodCost"
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
      {user.id && (<SwipeableDrawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
        onClick={handleDrawerClose}
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
              <ListItem button key={i} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <div className={classes.fixedFooter}>
          <List>
            <ListItem button key="logout" onClick={handleLogoutOpen}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
      )}
      <div>
      <Dialog
        open={logout}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleLogoutCancel}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Logout?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you'd like to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary">
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
}

export default Nav;