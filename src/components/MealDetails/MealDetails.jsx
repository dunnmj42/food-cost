import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';

import MealCard from "../MealCard/MealCard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      display: "flex",
      flexWrap: "nowrap",
      margin: "auto",
      justifyContent: "center",
      flexGrow: 1,
    },
  },
  cpm: {
    margin: 40,
    padding: 5,
  },
  fieldWidth: {
    width: 25,
  },
}));

function MealDetails() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const details = useSelector((store) => store?.details);

  const meal = details[0];
  const ingredients = details[1];

  const buttonTitle = "EDIT";

  const handleClick = () => {
    dispatch({ type: "FETCH_DETAILS", payload: meal?.id }); 
    history.push("/edit"); 
  };

  return (
    <div className="container">
      <div className={classes.root}>
      <div>
      <MealCard meal={meal} handleClick={handleClick} buttonTitle={buttonTitle}/>
      </div>
      <div>
      <Paper className={classes.cpm} onClick={() => history.push("/trends")}>
        Cost Per Meal: ${meal?.cost_per_meal.toFixed(2)}
      </Paper>
      </div>
      <div>
      <Grid container spacing={2} className={classes.root}>
        {ingredients?.map((ingredient, i) => {
          return (
            <Grid container spacing={2} key={i}>
              <Grid item>
              <TextField
                label="Ingredient"
                variant="outlined"
                value={ingredient?.name}
              />
              </Grid>
              <Grid item>
              <TextField
                label="Price"
                variant="outlined"
                InputProps={ {startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                value={ingredient?.price}
              />
              </Grid>
              <Grid item>
              <TextField
                label="Quantity Used"
                variant="outlined"
                value={ingredient?.ingredient_qty}
              />
              </Grid>
            </Grid>
          );
        })}
        <Grid item>
          <TextField
            label="Portions Made"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={meal?.portions}
          />
        </Grid>
      </Grid>
      </div>
      </div>
    </div>
  );
}

export default MealDetails;
