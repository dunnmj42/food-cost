import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";


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
  historyLink: {
    textDecoration: "none",
  },
}));

function Trends() {

  const meals = useSelector((store) => store?.meals);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "FETCH_MEALS",
    });
  }, []);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthMeals = meals?.filter((meal) => { 
    let mealMonth = new Date(meal.date).getMonth();
    let mealYear = new Date(meal.date).getFullYear();
    return mealMonth === currentMonth && mealYear === currentYear;
  });

  let monthCost = 0;
  
  for(let i = 0; i < monthMeals?.length; i++){
    monthCost += monthMeals[i].cost_per_meal;
  };

  let monthAverage = monthCost / monthMeals.length;

  const yearMeals = meals?.filter((meal) => { 
    let mealYear = new Date(meal.date).getFullYear();
    return mealYear === currentYear;
  });

  let yearCost = 0;
  
  for(let i = 0; i < yearMeals?.length; i++){
    yearCost += yearMeals[i].cost_per_meal;
  };

  let yearAverage = yearCost / yearMeals.length;
  
  let totalCost = 0;
  
  for(let i = 0; i < meals?.length; i++){
    totalCost += meals[i].cost_per_meal;
  };

  let averageCost = totalCost / meals.length;

  return (
    <div className="container">
      <div className={classes.root}>
        <Paper className={classes.cpm} onClick={() => history.push("/trends")}>
          Monthly Average Cost Per Meal: ${monthAverage.toFixed(2)}
        </Paper>
        <Paper className={classes.cpm} onClick={() => history.push("/trends")}>
          Annual Average Cost Per Meal: ${yearAverage.toFixed(2)}
        </Paper>
        <Paper className={classes.cpm} onClick={() => history.push("/trends")}>
          All-Time Average Cost Per Meal: ${averageCost.toFixed(2)}
        </Paper>
      </div>
    </div>
  );
}

export default Trends;