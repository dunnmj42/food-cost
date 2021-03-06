// React
import React, { useState } from "react";

// MUI
import Button from "@material-ui/core/Button";

// Components 
import LoginDialog from "../LoginDialog/LoginDialog";
import RegisterDialog from "../RegisterDialog/RegisterDialog";

function LandingPage() {
  
  // State
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  // Login handler
  const handleLoginClick = () => {
    setLogin(true);
  };

  // Register handler
  const handleRegisterClick = () => {
    setRegister(true);
  };

  return (
    <div className="container">
      <center>
        <h1>Welcome</h1>
        <br />
        <br />
        <h4>New User?</h4>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegisterClick}
        >
          Register
        </Button>
        <h4>Already Have an Account?</h4>
        <Button variant="contained" color="primary" onClick={handleLoginClick}>
          Login
        </Button>
      </center>
      <RegisterDialog register={register} setRegister={setRegister} />
      <LoginDialog login={login} setLogin={setLogin} />
    </div>
  );
}

export default LandingPage;
