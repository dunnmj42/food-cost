import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";

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
  cpm: {
    margin: 40,
    padding: 5,
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
      <Paper>
        {ingredients?.map((ingredient, i) => {
          return (
            <Paper key={i}>
              <TextField
                label="Ingredient"
                variant="outlined"
                value={ingredient?.name}
              />
              <TextField
                label="Price"
                variant="outlined"
                value={ingredient?.price}
              />
              <TextField
                label="Quantity Used"
                variant="outlined"
                value={ingredient?.ingredient_qty}
              />
            </Paper>
          );
        })}
      </Paper>
      </div>
      </div>
    </div>
  );
}

export default MealDetails;
