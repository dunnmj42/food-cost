// React, Redux, Router
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

// Transition on mount
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LogoutDialog({ remove, setRemove, mealId }) {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // Remove meal handle
  const handleRemove = () => {
    setRemove(false);
    dispatch({ type: "REMOVE_MEAL", payload: mealId });
    history.push("/mealhistory");
  };

  // Cancel handler
  const handleRemoveCancel = () => {
    setRemove(false);
  };

  return (
    <>
      <Dialog
        open={remove}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleRemoveCancel}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Remove Meal?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you'd like to remove this meal? THIS CANNOT BE UNDONE!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveCancel} color="inherit">
            Go Back
          </Button>
          <Button onClick={handleRemove} color="secondary" variant="contained">
            Remove Meal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LogoutDialog;
