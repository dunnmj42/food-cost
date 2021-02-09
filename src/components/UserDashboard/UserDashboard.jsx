import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex',
      flexWrap: 'wrap',
      margin: 'auto',
      justifyContent: 'center',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function UserDashboard() {
  
  const user = useSelector((store) => store.user);
  const meals = useSelector((store) => store?.meals);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_MEALS'
    })
  }, [])

  return (
    <div className="container">
      <div className={classes.root}>
      <Fab variant="extended" color="primary">
        <AddIcon className={classes.extendedIcon} />
        Add Meal
      </Fab>
      <br/>
      <Paper>
        Average Cost Per Meal: $9.99
      </Paper>
    </div>
    </div>
  );
}

export default UserDashboard;
