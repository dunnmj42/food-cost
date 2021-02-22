// React
import React from "react";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Placeholder image
import placeholder from "/public/images/placeholder.png";

// MUI styling
const useStyles = makeStyles((theme) => ({
  mealCard: {
    justifyContent: "left",
    maxWidth: 450,
  },
}));

function MealCard({ meal, handleClick, buttonTitle }) {

  const classes = useStyles();

  return (
    <>
      <Card className={classes.mealCard} key={meal?.id}>
        <CardHeader
          title={meal?.name}
          className={classes.mealCard}
          subheader={new Date(meal?.date).toLocaleDateString("en-us")}
        />
        <CardMedia
          component="img"
          alt={meal?.name}
          height="180"
          image={meal?.image || placeholder}
          title={meal?.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {meal?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="inherit" onClick={handleClick}>
            {buttonTitle}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default MealCard;
