import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  mealcard: {
    justifyContent: "left",
    maxWidth: 450
  },
}));

function MealCard({ meal }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.mealcard} key={meal?.id}>
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
          <Button size="small" color="primary">
            Details
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default MealCard;
