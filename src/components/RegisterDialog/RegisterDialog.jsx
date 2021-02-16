import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RegisterDialog({ register, setRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const errors = useSelector((store) => store.errors);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleRegister = () => {
    if (username && password) {
      dispatch({
        type: "REGISTER",
        payload: {
          username: username,
          password: password,
        },
      });
      setRegister(false);
      history.push("/user");
    } else {
      dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  };

  const handleRegisterCancel = () => {
    setRegister(false);
  };

  return (
    <>
      <Dialog
        open={register}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleRegisterCancel}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Register"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {errors.registrationMessage}
              </h3>
            )}
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="password"
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegisterCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRegister} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RegisterDialog;
