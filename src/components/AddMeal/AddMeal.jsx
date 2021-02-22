// React, Redux, Router
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";

// Alert for validation snackbar
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// MUI styling
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      display: "flex",
      flexWrap: "nowrap",
      margin: "auto",
      justifyContent: "center",
      flexGrow: 1,
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function AddMeal() {
  
  // Blank ingredient and meal 
  const blankIngredient = { name: "", price: "", ingredient_qty: "" };
  const blankMeal = {
    name: "",
    description: "",
    image: "",
    portions: "",
    date: "",
  };

  // State
  const [ingredients, setIngredients] = useState([{ ...blankIngredient }]);
  const [meal, setMeal] = useState({ ...blankMeal });
  const [validationAlert, setValidationAlert] = useState(false);

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // Dynamic input add
  const addIngredient = () => {
    setIngredients([...ingredients, { ...blankIngredient }]);
  };

  // Dynamic input remove
  const removeIngredient = (i) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(i, 1);
    setIngredients(newIngredients);
  };

  // Ingredient input change handler
  const ingredientChange = (e) => {
    const newIngredients = [...ingredients];
    newIngredients[e.target.dataset.i][e.target.dataset.property] =
      e.target.value;
    setIngredients(newIngredients);
  };

  // Meal inputs change handler 
  const mealChange = (e) => {
    const newMeal = { ...meal };
    newMeal[e.target.name] = e.target.value;
    setMeal(newMeal);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATION
    if (
      meal.name &&
      meal.description &&
      meal.portions &&
      meal.date &&
      ingredients[0].name &&
      ingredients[0].price &&
      ingredients[0].ingredient_qty
    ) {
      let newMeal = { meal, ingredients };

      // Dispatch and clear inputs
      dispatch({ type: "NEW_MEAL", payload: newMeal });

      setMeal({ ...blankMeal });
      setIngredients([{ ...blankIngredient }]);

      history.push("/mealhistory"); // push to history
    } else {
      setValidationAlert(true); // validation alert
    }
  };

  // Validation close handler
  const handleValidationClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setValidationAlert(false);
  };

  // SECRET BUTTON STUFF KEEP OUT
  const popData = (e) => {
    e.preventDefault();
    setMeal({
      name: "Szechuan Pork and Broccoli",
      description: 
        `Peppercorn and nutmeg crusted pork chops with roasted broccoli, onion, 
        brown rice, and chili crisp`,
      image:
        "https://i.imgur.com/HvWCoCz.jpg",
      portions: "6",
      date: "2/20/2021",
    });
    setIngredients([
      { name: "Pork Chops", price: "4.99", ingredient_qty: "2" },
      { name: "Szechuan Rub", price: "12.50", ingredient_qty: "0.25" },
      { name: "Broccoli", price: "2.59", ingredient_qty: "3" },
      { name: "Onion", price: "1.99", ingredient_qty: "0.33" },
      { name: "Brown Rice", price: "1.39", ingredient_qty: "1" },
      { name: "Lao Gan Ma Chili Crisp", price: "39.99", ingredient_qty: "1" },
    ]);
  };

  return (
    <Slide in={true}>
      <div className="container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.root}>
            {ingredients.map((_, i) => {
              const nameId = `name-${i}`;
              const priceId = `price-${i}`;
              const qtyId = `qty-${i}`;
              return (
                <Grid container spacing={1} key={i}>
                  <Grid item xs={6} lg={2}>
                    <TextField
                      id={nameId}
                      label="Ingredient"
                      name={nameId}
                      inputProps={{
                        "data-i": `${i}`,
                        "data-property": "name",
                      }}
                      InputLabelProps={{ shrink: true }}
                      value={ingredients[i].name}
                      onChange={ingredientChange}
                    />
                  </Grid>
                  <Grid item xs={3} lg={2}>
                    <TextField
                      id={priceId}
                      label="Price"
                      name={priceId}
                      inputProps={{
                        "data-i": `${i}`,
                        "data-property": "price",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      value={ingredients[i].price}
                      onChange={ingredientChange}
                    />
                  </Grid>
                  <Grid item xs={3} lg={2}>
                    <TextField
                      id={qtyId}
                      label="Quantity"
                      name={qtyId}
                      inputProps={{
                        "data-i": `${i}`,
                        "data-property": "ingredient_qty",
                      }}
                      InputLabelProps={{ shrink: true }}
                      value={ingredients[i].ingredient_qty}
                      onChange={ingredientChange}
                    />
                  </Grid>
                  <Grid item xs={2} lg={1}>
                    <IconButton
                      color="secondary"
                      aria-label="remove ingredient"
                      component="span"
                      onClick={() => removeIngredient(i)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}
            <br />
            <Grid container>
              <Grid item>
                <Fab variant="extended" color="primary" onClick={addIngredient}>
                  <AddIcon className={classes.extendedIcon} />
                  Add Ingredient
                </Fab>
              </Grid>
            </Grid>
            <br />
          </div>
          <Grid container spacing={2} className={classes.root}>
            <Grid item>
              <TextField
                id="name"
                name="name"
                label="Meal Name"
                value={meal.name}
                onChange={mealChange}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                id="description"
                name="description"
                multiline
                rowsMax={4}
                label="Meal Description"
                value={meal.description}
                onChange={mealChange}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                id="image"
                name="image"
                label="Meal Image URL"
                value={meal.image}
                onChange={mealChange}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                id="portions"
                name="portions"
                label="Number of Portions"
                value={meal.portions}
                onChange={mealChange}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                id="date"
                name="date"
                label="Date Made"
                value={meal.date}
                onChange={mealChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={validationAlert}
          autoHideDuration={8000}
          onClose={handleValidationClose}
        >
          <Alert onClose={handleValidationClose} severity="warning">
            Meals must contain a name, description, date, portion count, and
            single ingredient to be added!
          </Alert>
        </Snackbar>
        <button
          style={{ backgroundColor: "#1c313a", border: "none", marginTop: 160 }}
          onClick={popData}
        >
          +
        </button>
      </div>
    </Slide>
  );
}

export default AddMeal;
