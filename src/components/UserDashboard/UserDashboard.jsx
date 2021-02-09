import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

// floating action button
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

// paper for A-CPM
import Paper from "@material-ui/core/Paper";

// card imports - to breakout
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  mealcard: {
    maxWidth: 345,
    justifyContent: "left",
  },
}));

function UserDashboard() {
  const user = useSelector((store) => store.user);
  const meals = useSelector((store) => store?.meals);

  const recentMeal = meals[0];

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_MEALS",
    });
  }, []);

  return (
    <div className="container">
      <div className={classes.root}>
        <Fab variant="extended" color="primary">
          <AddIcon className={classes.extendedIcon} />
          Add Meal
        </Fab>
        <Paper className={classes.cpm}>Average Cost Per Meal: $9.99</Paper>
        <Card className={classes.mealcard} key={recentMeal?.id}>
          <CardHeader
            title={recentMeal?.name}
            subheader={new Date(recentMeal?.date).toLocaleDateString("en-us")}
          />
          <CardActionArea>
            <CardMedia
              component="img"
              alt={recentMeal?.name}
              height="180"
              image={recentMeal?.image}
              title={recentMeal?.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {recentMeal?.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Details
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default UserDashboard;
