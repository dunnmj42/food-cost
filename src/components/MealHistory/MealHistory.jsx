import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import MealCard from "../MealCard/MealCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 20,
  }
}));

function MealHistory() {
  const meals = useSelector((store) => store?.meals);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const buttonTitle = "DETAILS";

  const handleClick = (i) => {
    dispatch({ type: "FETCH_DETAILS", payload: meals[i]?.id });
    history.push("/details"); 
  };

  useEffect(() => {
    dispatch({
      type: "FETCH_MEALS",
    });
  }, []);

  return (
    <div className={classes.gridDiv}>
      <Grid container spacing={3} justify="center" alignItems="center" className={classes.root}>
        {meals?.map((meal, i) => {
          return (
            <Grid item key={i}>
              <MealCard meal={meal} handleClick={() => handleClick(i)} buttonTitle={buttonTitle}/>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default MealHistory;
