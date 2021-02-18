import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";

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

function UserDashboard() {
  const meals = useSelector((store) => store?.meals);
  const user = useSelector((store) => store?.user)

  const meal = meals[0];

  let totalCost = 0;

  for (let i = 0; i < meals?.length; i++) {
    totalCost += meals[i].cost_per_meal;
  }

  let averageCost = totalCost / meals.length;

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const buttonTitle = "DETAILS";

  const handleClick = () => {
    dispatch({ type: "FETCH_DETAILS", payload: meal?.id });
    history.push(`/details/${meal?.id}`);
  };

  useEffect(() => {
    dispatch({
      type: "FETCH_MEALS",
    });
  }, []);

  return (
    <div className="container">
      <div className={classes.root}>
        <h3>Welcome {user.username}!</h3>
        <br/>
        {meal && <p>Your Most Recent Meal:</p>}
        <br />
        <div>
          {meal ? (
            <Grow in={true}>
              <MealCard
                meal={meal}
                handleClick={handleClick}
                buttonTitle={buttonTitle}
              />
            </Grow>
          ) : (
            <center>
              <h1>There's nothing here yet! Why not add a meal?</h1>
            </center>
          )}
        </div>
        <div>
          {meal && (
            <Grow in={true}>
              <Paper
                className={classes.cpm}
                onClick={() => history.push("/trends")}
              >
                Average Cost Per Meal: ${averageCost.toFixed(2)}
              </Paper>
            </Grow>
          )}
        </div>
        <div>
          <Slide direction="up" in={true}>
            <Fab
              variant="extended"
              color="secondary"
              onClick={() => history.push("/addmeal")}
            >
              <AddIcon className={classes.extendedIcon} />
              Add Meal
            </Fab>
          </Slide>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
