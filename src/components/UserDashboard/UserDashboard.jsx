import React from 'react';
import {useSelector} from 'react-redux';

function UserDashboard() {
  
  const user = useSelector((store) => store.user);



  return (
    <div className="container">
      <h1>User Dashboard</h1>
      
    </div>
  );
}

export default UserDashboard;
