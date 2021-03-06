// React, Redux, Router
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";

// Component
import MealCard from "../MealCard/MealCard";

// MUI styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 20,
  },
  searchPaper: {
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function MealHistory() {

  // State for search
  const [search, setSearch] = useState(null);

  // Meals selector
  const allMeals = useSelector((store) => store?.meals);

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // Card button title
  const buttonTitle = "DETAILS";

  // UseEffect for GET meals
  useEffect(() => {
    dispatch({
      type: "FETCH_MEALS",
    });
  }, []);

  // Click handler to detail view
  const handleClick = (i) => {
    dispatch({ type: "FETCH_DETAILS", payload: meals[i]?.id });
    history.push(`/details/${meals[i]?.id}`);
  };

  // SEARCH function
  const meals = allMeals.filter((meal) => {
    if (search == null) return allMeals;
    else if (meal?.name?.toLowerCase().includes(search.toLowerCase()))
      return meal;
  });

  return (
    <div className={classes.gridDiv}>
      <Grow in={true}>
        <Paper component="form" className={classes.searchPaper}>
          <TextField
            id="search"
            placeholder="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Paper>
      </Grow>
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        {meals?.map((meal, i) => {
          return (
            <Grow in={true} key={i}>
              <Grid item key={i}>
                <MealCard
                  meal={meal}
                  handleClick={() => handleClick(i)}
                  buttonTitle={buttonTitle}
                />
              </Grid>
            </Grow>
          );
        })}
      </Grid>
    </div>
  );
}

export default MealHistory;
