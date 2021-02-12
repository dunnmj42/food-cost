import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  mealcard: {
    justifyContent: "left",
    maxWidth: 450,
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

  const handleClick = () => {
    dispatch({ type: "FETCH_DETAILS", payload: meal?.id }); 
    history.push("/edit"); 
  };

  return (
    <div className="container">
      <Card className={classes.mealcard}>
        <CardHeader
          title={meal?.name}
          subheader={new Date(meal?.date).toLocaleDateString("en-us")}
        />
        <CardActionArea>
          <CardMedia
            component="img"
            alt={meal?.name}
            height="180"
            image={meal?.image}
            title={meal?.name}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {meal?.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClick}>
            Edit
          </Button>
        </CardActions>
      </Card>
      <Paper className={classes.cpm} onClick={() => history.push("/trends")}>
        Cost Per Meal: ${meal?.cost_per_meal.toFixed(2)}
      </Paper>
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
  );
}

export default MealDetails;
