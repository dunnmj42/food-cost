import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory, useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";

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
}));

function MealDetails() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, [id]);

  const details = useSelector((store) => store?.details);

  const meal = details[0];
  const ingredients = details[1];

  const buttonTitle = "EDIT";

  const handleClick = () => {
    dispatch({ type: "FETCH_DETAILS", payload: meal?.id });
    history.push(`/edit/${meal?.id}`);
  };

  return (
    <div className="container">
      <div className={classes.root}>
        <Grow in={true}>
          <div>
            <MealCard
              meal={meal}
              handleClick={handleClick}
              buttonTitle={buttonTitle}
            />
          </div>
        </Grow>
        <Slide direction="up" in={true}>
          <div>
            <Paper
              className={classes.cpm}
              onClick={() => history.push("/trends")}
            >
              Cost Per Meal: ${meal?.cost_per_meal.toFixed(2)}
            </Paper>
          </div>
        </Slide>
        <Slide direction="up" in={true}>
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
        </Slide>
        <br />
        <Slide direction="up" in={true}>
          <center>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/mealhistory")}
            >
              Go Back
            </Button>
          </center>
        </Slide>
      </div>
    </div>
  );
}

export default MealDetails;
