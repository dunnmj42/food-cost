import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

// floating action button
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

// paper for A-CPM
import Paper from "@material-ui/core/Paper";

import MealCard from "../MealCard/MealCard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      display: "flex",
      flexWrap: "wrap",
      margin: "auto",
      justifyContent: "center",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  cpm: {
    margin: 40,
    padding: 5,
  },
}));

function UserDashboard() {
  const meals = useSelector((store) => store?.meals);

  const meal = meals[0];

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_MEALS",
    });
  }, []);

  return (
    <div className="container">
      <div className={classes.root}>
        <Fab variant="extended" color="primary">
          <AddIcon className={classes.extendedIcon} />
          Add Meal
        </Fab>
        <Paper className={classes.cpm}>Average Cost Per Meal: $9.99</Paper>
        <MealCard meal={meal}/>
      </div>
    </div>
  );
}

export default UserDashboard;
