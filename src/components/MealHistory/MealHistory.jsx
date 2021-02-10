import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import MealCard from "../MealCard/MealCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridDiv: {
    padding: 30,
  }
}));

function MealHistory() {
  const meals = useSelector((store) => store?.meals);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_MEALS",
    });
  }, []);

  return (
    <div className={classes.gridDiv}>
      <Grid container spacing={3} className={classes.root} justify="center" alignItems="center">
        {meals?.map((meal, i) => {
          return (
            <Grid item md={6} key={i}>
              <MealCard meal={meal} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default MealHistory;
