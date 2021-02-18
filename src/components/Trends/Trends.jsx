import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow"

import TrendChart from "../TrendChart/TrendChart";

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
    margin: 10,
    padding: 5,
  },
}));

function Trends() {

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_MEALS",
    });
  }, []);

  const unsortedMeals = useSelector((store) => store.meals);

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
        <div>
          <Grow in={true}>
          <Paper className={classes.cpm}>
            Monthly Average Cost Per Meal: ${monthAverage.toFixed(2)}
          </Paper>
          </Grow>
        </div>
        <TrendChart meals={monthMeals} />
        <div>
          <Grow in={true}>
          <Paper className={classes.cpm}>
            Annual Average Cost Per Meal: ${yearAverage.toFixed(2)}
          </Paper>
          </Grow>
        </div>
        <TrendChart meals={yearMeals} />
        <div>
          <Grow in={true}>
          <Paper className={classes.cpm}>
            All-Time Average Cost Per Meal: ${averageCost.toFixed(2)}
          </Paper>
          </Grow>
        </div>
        <TrendChart meals={meals} />
      </div>
    </div>
  );
}

export default Trends;
