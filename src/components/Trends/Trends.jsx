import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import { Line } from 'react-chartjs-2';


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

  const [monthData, setMonthData] = useState({});
  const [yearData, setYearData] = useState({});
  const [allTimeData, setAllTimeData] = useState({});

  const monthChart = () => {
    setMonthData({
      labels: monthLabels,
      datasets: [
        {
          label: 'Monthly Cost Per Meal',
          data: monthValues,
        }
      ]
    })
  }

  const yearChart = () => {
    setYearData({
      labels: yearLabels,
      datasets: [
        {
          label: 'Annual Cost Per Meal',
          data: yearValues,
        }
      ]
    })
  }

  const allTimeChart = () => {
    setAllTimeData({
      labels: allTimeLabels,
      datasets: [
        {
          label: 'All-Time Cost Per Meal',
          data: allTimeValues,
        }
      ]
    })
  }

  const unsortedMeals = useSelector((store) => store?.meals);

  const meals = unsortedMeals.sort((a, b) => new Date(a.date) - new Date(b.date));

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_MEALS",
    });
    monthChart();
    yearChart();
    allTimeChart();
  }, []);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthMeals = meals?.filter((meal) => { 
    let mealMonth = new Date(meal.date).getMonth();
    let mealYear = new Date(meal.date).getFullYear();
    return mealMonth === currentMonth && mealYear === currentYear;
  });

  const monthLabels = (monthMeals.map((meal) => {
    return new Date(meal.date).toLocaleDateString("en-us");
  }));

  const monthValues = (monthMeals?.map((meal) => {
    return meal.cost_per_meal.toFixed(2);
  }));

  let monthCost = 0;
  
  for(let i = 0; i < monthMeals?.length; i++){
    monthCost += monthMeals[i].cost_per_meal;
  };

  const monthAverage = monthCost / monthMeals.length;

  const yearMeals = meals?.filter((meal) => { 
    let mealYear = new Date(meal.date).getFullYear();
    return mealYear === currentYear;
  });

  const yearLabels = (yearMeals.map((meal) => {
    return new Date(meal.date).toLocaleDateString("en-us");
  }));

  const yearValues = (yearMeals?.map((meal) => {
    return meal.cost_per_meal.toFixed(2);
  }));

  let yearCost = 0;
  
  for(let i = 0; i < yearMeals?.length; i++){
    yearCost += yearMeals[i].cost_per_meal;
  };

  const yearAverage = yearCost / yearMeals.length;

  const allTimeLabels = (meals.map((meal) => {
    return new Date(meal.date).toLocaleDateString("en-us");
  }));

  const allTimeValues = (meals?.map((meal) => {
    return meal.cost_per_meal.toFixed(2);
  }));
  
  let totalCost = 0;
  
  for(let i = 0; i < meals?.length; i++){
    totalCost += meals[i].cost_per_meal;
  };

  const averageCost = totalCost / meals.length;

  return (
    <div className="container">
      <div className={classes.root}>
        <Paper className={classes.cpm}>
          Monthly Average Cost Per Meal: ${monthAverage.toFixed(2)}
        </Paper>
        <div>
          <Line data={monthData}/>
        </div>
        <Paper className={classes.cpm}>
          Annual Average Cost Per Meal: ${yearAverage.toFixed(2)}
        </Paper>
        <div>
          <Line data={yearData}/>
        </div>
        <Paper className={classes.cpm}>
          All-Time Average Cost Per Meal: ${averageCost.toFixed(2)}
        </Paper>
        <div>
          <Line data={allTimeData}/>
        </div>
      </div>
    </div>
  );
}

export default Trends;