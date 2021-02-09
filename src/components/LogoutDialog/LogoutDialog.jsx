import React from "react";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LogoutDialog({logout, setLogout}) {

  const dispatch = useDispatch();

  const handleLogout = () => {
    setLogout(false);
    dispatch({ type: "LOGOUT" });
  };

  const handleLogoutCancel = () => {
    setLogout(false);
  };

  return (
    <>
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
    </>
  );
};

export default LogoutDialog;