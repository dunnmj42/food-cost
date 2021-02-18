import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import MealCard from "../MealCard/MealCard";
import { Button } from "@material-ui/core";

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
          <MealCard
            meal={meal}
            handleClick={handleClick}
            buttonTitle={buttonTitle}
          />
        </div>
        <div>
          <Paper
            className={classes.cpm}
            onClick={() => history.push("/trends")}
          >
            Cost Per Meal: ${meal?.cost_per_meal.toFixed(2)}
          </Paper>
        </div>
        <div>
          <Grid container spacing={3} className={classes.root}>
            {ingredients?.map((ingredient, i) => {
              return (
                <Grid container spacing={1} key={i}>
                  <Grid item xs={6} lg={2}>
                    <TextField
                      label="Ingredient"
                      variant="outlined"
                      value={ingredient?.name}
                    />
                  </Grid>
                  <Grid item xs={3} lg={2}>
                    <TextField
                      label="Price"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      value={ingredient?.price}
                    />
                  </Grid>
                  <Grid item xs={3} lg={2}>
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
        <br />
        <center>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/mealhistory")}
          >
            Go Back
          </Button>
        </center>
      </div>
    </div>
  );
}

export default MealDetails;
