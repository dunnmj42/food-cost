// React, Redux, Router
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HistoryIcon from "@material-ui/icons/History";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TimelineIcon from "@material-ui/icons/Timeline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// Component
import LogoutDialog from "../LogoutDialog/LogoutDialog";

// MUI styling
const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    height: 56,
  },
  drawerFooter: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
}));

function NavDrawer({ open, setOpen }) {

  // Logout dialog state
  const [logout, setLogout] = useState(false);

  // User store
  const user = useSelector((store) => store.user);

  // Hooks
  const classes = useStyles();
  const history = useHistory();

  // Link list for drawer - pushes the user to places
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

  // Drawer open
  const handleDrawerOpen = () => {
    if (user.id != null) {
      setOpen(true);
    }
  };

  // Drawer close
  const handleDrawerClose = () => {
    if (user.id != null) {
      setOpen(false);
    }
  };

  // Open logout dialog
  const handleLogoutOpen = () => {
    setLogout(true);
  };

  return (
    <>
      {user.id && (
        <SwipeableDrawer
          anchor="left"
          open={open}
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
          <div className={classes.drawerFooter}>
            <List>
              <ListItem button key="logout" onClick={handleLogoutOpen}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
      )}
      <LogoutDialog logout={logout} setLogout={setLogout} />
    </>
  );
}

export default NavDrawer;
