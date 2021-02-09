import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function UserDashboard() {
  
  const user = useSelector((store) => store.user);
  const meals = useSelector((store) => store?.meals);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_MEALS'
    })
  }, [])

  return (
    <div className="container">
      <h1>User Dashboard</h1>
      {JSON.stringify(meals)}
    </div>
  );
}

export default UserDashboard;
