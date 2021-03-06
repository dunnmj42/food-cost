// React, Redux, Router
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

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
import Slide from "@material-ui/core/Slide";

// Component
import RemoveDialog from "../RemoveDialog/RemoveDialog";

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

function MealEdit() { // This is a big ugly one. It SHOULD be broken up

  // State for ingredient editing
  const [newIngredients, setNewIngredients] = useState([]);
  const [ingredientsToRemove, setIngredientsToRemove] = useState([]);

  // Remove dialog state
  const [remove, setRemove] = useState(false);

  // Details store
  const details = useSelector((store) => store?.details);

  // Populate existing field state
  const [ingredients, setIngredients] = useState(details[1]);
  const [meal, setMeal] = useState(details[0]);

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  // Blank ingredient for dynamic form
  const blankIngredient = { name: "", price: "", ingredient_qty: "" };

  // UseEffect to GET details - again on ID change
  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, [id]);

  // UseEffect sets ingredients and meals in edit form
  useEffect(() => {
    setIngredients(details[1]);
    setMeal(details[0]);
  }, [details]);

  // Add a new ingredient to dynamic form
  const addNewIngredient = () => {
    setNewIngredients([...newIngredients, { ...blankIngredient }]);
  };

  // Remove ingredient from form
  const removeIngredient = (i) => {
    const updatedIngredients = [...ingredients];
    const removalTarget = ingredients[i];
    setIngredientsToRemove([...ingredientsToRemove, removalTarget]);
    updatedIngredients.splice(i, 1);
    setIngredients(updatedIngredients);
  };

  // Ingredient change handler
  const ingredientChange = (e) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[e.target.dataset.i][e.target.dataset.property] =
      e.target.value;
    setIngredients(updatedIngredients);
  };

  // Remove a new ingredient added in Edit view
  const removeNewIngredient = (i) => {
    const updatedNewIngredients = [...newIngredients];
    updatedNewIngredients.splice(i, 1);
    setNewIngredients(updatedNewIngredients);
  };

  // New ingredient change handler
  const newIngredientChange = (e) => {
    const updatedNewIngredients = [...newIngredients];
    updatedNewIngredients[e.target.dataset.i][e.target.dataset.property] =
      e.target.value;
    setNewIngredients(updatedNewIngredients);
  };

  // Meal details change handler
  const mealChange = (e) => {
    const newMeal = { ...meal };
    newMeal[e.target.name] = e.target.value;
    setMeal(newMeal);
  };

  // Handle submit to dispatch for PUT
  const handleSubmit = (e) => {
    e.preventDefault();

    let editedMeal = { meal, ingredients, newIngredients, ingredientsToRemove };

    dispatch({ type: "EDIT_MEAL", payload: editedMeal });
    history.push(`/details/${id}`);
  };

  // Revert button handler to cancel edit and abandon
  const handleRevert = (e) => {
    history.push(`/details/${id}`);
  };

  // Open remove dialog to DELETE
  const handleDelete = (e) => {
    setRemove(true);
  };

  // This is a big oof down here:
  return (
    <Slide in={true}>
      <div className="container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.root}>
            {ingredients?.map((_, i) => {
              const nameId = `name-${i}`;
              const priceId = `price-${i}`;
              const qtyId = `qty-${i}`;
              return (
                <Grid container spacing={1} key={i}>
                  <Grid item xs={5} lg={2}>
                    <TextField
                      id={nameId}
                      label="Ingredient"
                      name={nameId}
                      inputProps={{
                        "data-i": `${i}`,
                        "data-property": "name",
                      }}
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
                      value={ingredients[i].ingredient_qty}
                      onChange={ingredientChange}
                    />
                  </Grid>
                  <Grid item xs={2} lg={2}>
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
            {newIngredients?.map((_, i) => {
              const nameId = `name-${i}`;
              const priceId = `price-${i}`;
              const qtyId = `qty-${i}`;
              return (
                <Grid container spacing={1} key={i} className={classes.root}>
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
                      value={newIngredients[i].name}
                      onChange={newIngredientChange}
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
                      value={newIngredients[i].price}
                      onChange={newIngredientChange}
                    />
                  </Grid>
                  <Grid item xs={3} lg={2}>
                    <TextField
                      id={qtyId}
                      label="Quantity Used"
                      name={qtyId}
                      inputProps={{
                        "data-i": `${i}`,
                        "data-property": "ingredient_qty",
                      }}
                      InputLabelProps={{ shrink: true }}
                      value={newIngredients[i].ingredient_qty}
                      onChange={newIngredientChange}
                    />
                  </Grid>
                  <Grid item xs={2} lg={1}>
                    <IconButton
                      color="secondary"
                      aria-label="remove ingredient"
                      component="span"
                      onClick={() => removeNewIngredient(i)}
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
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={addNewIngredient}
                >
                  <AddIcon className={classes.extendedIcon} />
                  Add Ingredient
                </Fab>
              </Grid>
            </Grid>
            <br />
          </div>
          <div>
            <Grid container spacing={2} className={classes.root}>
              <Grid item>
                <TextField
                  id="name"
                  name="name"
                  label="Meal Name"
                  InputLabelProps={{ shrink: true }}
                  value={meal?.name}
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
                  InputLabelProps={{ shrink: true }}
                  value={meal?.description}
                  onChange={mealChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="image"
                  name="image"
                  label="Meal Image URL"
                  InputLabelProps={{ shrink: true }}
                  value={meal?.image}
                  onChange={mealChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="portions"
                  name="portions"
                  label="Number of Portions"
                  InputLabelProps={{ shrink: true }}
                  value={meal?.portions}
                  onChange={mealChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="date"
                  name="date"
                  label="Date Made"
                  InputLabelProps={{ shrink: true }}
                  value={new Date(meal?.date).toLocaleDateString("en-us")}
                  onChange={mealChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
          <br />
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs>
              <Button variant="contained" color="primary" type="submit">
                Save Changes
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRevert}
              >
                Revert Changes
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                Remove Meal
              </Button>
            </Grid>
          </Grid>
        </form>
        <RemoveDialog remove={remove} setRemove={setRemove} mealId={meal?.id} />
      </div>
    </Slide>
  );
}

export default MealEdit;
