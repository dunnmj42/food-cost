import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

import Button from '@material-ui/core/Button';

// CUSTOM COMPONENTS
import LoginDialog from '../LoginDialog/LoginDialog';
import RegisterDialog from '../RegisterDialog/RegisterDialog';

function LandingPage() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  
  const handleLoginClick = () => {
    setLogin(true);
  };

  const handleRegisterClick = () => {
    setRegister(true);
  }
  

  return (
    <div className="container">
          <center>
          <h1>Welcome</h1>
            <h4>New User?</h4>
            <Button variant="outlined" color="primary" onClick={handleRegisterClick}>
              Register
            </Button>
            <h4>Already Have an Account?</h4>
            <Button variant="outlined" color="primary" onClick={handleLoginClick}>
              Login
            </Button>
          </center>
      <RegisterDialog register={register} setRegister={setRegister} />
      <LoginDialog login={login} setLogin={setLogin} />
    </div>
  );
}

export default LandingPage;
