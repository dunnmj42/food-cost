import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import TrendChart from "../TrendChart/TrendChart"

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

  const unsortedMeals = useSelector((store) => store?.meals);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_MEALS",
    });
  }, []);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const meals = unsortedMeals.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const monthMeals = meals?.filter((meal) => {
    let mealMonth = new Date(meal.date).getMonth();
    let mealYear = new Date(meal.date).getFullYear();
    return mealMonth === currentMonth && mealYear === currentYear;
  });

  const yearMeals = meals?.filter((meal) => {
    let mealYear = new Date(meal.date).getFullYear();
    return mealYear === currentYear;
  });

  let monthCost = 0;

  for (let i = 0; i < monthMeals?.length; i++) {
    monthCost += monthMeals[i].cost_per_meal;
  }

  const monthAverage = monthCost / monthMeals.length;

  let yearCost = 0;

  for (let i = 0; i < yearMeals?.length; i++) {
    yearCost += yearMeals[i].cost_per_meal;
  }

  const yearAverage = yearCost / yearMeals.length;

  let totalCost = 0;

  for (let i = 0; i < meals?.length; i++) {
    totalCost += meals[i].cost_per_meal;
  }

  const averageCost = totalCost / meals.length;

  return (
    <div className="container">
      <div className={classes.root}>
        <Paper className={classes.cpm}>
          Monthly Average Cost Per Meal: ${monthAverage.toFixed(2)}
        </Paper>
          <TrendChart meals={monthMeals} />
        <Paper className={classes.cpm}>
          Annual Average Cost Per Meal: ${yearAverage.toFixed(2)}
        </Paper>
        <TrendChart meals={yearMeals} />
        <Paper className={classes.cpm}>
          All-Time Average Cost Per Meal: ${averageCost.toFixed(2)}
        </Paper>
        <TrendChart meals={meals} />
      </div>
    </div>
  );
}

export default Trends;