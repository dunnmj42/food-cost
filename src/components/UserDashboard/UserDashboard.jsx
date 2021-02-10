import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// floating action button
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

// paper for A-CPM
import Paper from "@material-ui/core/Paper";

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

  const meal = meals[0];

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "FETCH_MEALS",
    });
  }, []);

  return (
    <div className="container">
      <div className={classes.root}>
        <Fab
          variant="extended"
          color="primary"
          onClick={() => history.push("/addmeal")}
        >
          <AddIcon className={classes.extendedIcon} />
          Add Meal
        </Fab>
        <Paper className={classes.cpm} onClick={() => history.push("/trends")}>
          Average Cost Per Meal: $9.99
        </Paper>
        <Link to={"/mealhistory"} className={classes.historyLink}>
          <MealCard meal={meal} />
        </Link>
      </div>
    </div>
  );
}

export default UserDashboard;
