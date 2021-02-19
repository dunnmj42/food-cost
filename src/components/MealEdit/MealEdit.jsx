import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

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

import RemoveDialog from "../RemoveDialog/RemoveDialog";

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

function MealEdit() {

  const [newIngredients, setNewIngredients] = useState([]);
  const [ingredientsToRemove, setIngredientsToRemove] = useState([]);

  const [remove, setRemove] = useState(false);

  const [ingredients, setIngredients] = useState(details[1]);
  const [meal, setMeal] = useState(details[0]);

  const details = useSelector((store) => store?.details);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const blankIngredient = { name: "", price: "", ingredient_qty: "" };

  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, [id]);

  useEffect(() => {
    setIngredients(details[1]);
    setMeal(details[0]);
  }, [details]);

  const addNewIngredient = () => {
    setNewIngredients([...newIngredients, { ...blankIngredient }]);
  };

  const removeIngredient = (i) => {
    const updatedIngredients = [...ingredients];
    const removalTarget = ingredients[i];
    setIngredientsToRemove([...ingredientsToRemove, removalTarget]);
    updatedIngredients.splice(i, 1);
    setIngredients(updatedIngredients);
  };

  const ingredientChange = (e) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[e.target.dataset.i][e.target.dataset.property] =
      e.target.value;
    setIngredients(updatedIngredients);
  };

  const removeNewIngredient = (i) => {
    const updatedNewIngredients = [...newIngredients];
    updatedNewIngredients.splice(i, 1);
    setNewIngredients(updatedNewIngredients);
  };

  const newIngredientChange = (e) => {
    const updatedNewIngredients = [...newIngredients];
    updatedNewIngredients[e.target.dataset.i][e.target.dataset.property] =
      e.target.value;
    setNewIngredients(updatedNewIngredients);
  };

  const mealChange = (e) => {
    const newMeal = { ...meal };
    newMeal[e.target.name] = e.target.value;
    setMeal(newMeal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let editedMeal = { meal, ingredients, newIngredients, ingredientsToRemove };

    dispatch({ type: "EDIT_MEAL", payload: editedMeal });
    history.push(`/details/${id}`);
  };

  const handleRevert = (e) => {
    history.push(`/details/${id}`);
  };

  const handleDelete = (e) => {
    setRemove(true);
  };

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
                  <Grid item xs={6} lg={2}>
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
                      variant="outlined"
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
                      variant="outlined"
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
                      value={ingredients[i].ingredient_qty}
                      onChange={ingredientChange}
                      variant="outlined"
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
                      variant="outlined"
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
                      variant="outlined"
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
                      variant="outlined"
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
                  InputLabelProps={{ shrink: meal?.name }}
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
                  InputLabelProps={{ shrink: meal?.description }}
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
                  InputLabelProps={{ shrink: meal?.image }}
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
                  InputLabelProps={{ shrink: meal?.portions }}
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
                  InputLabelProps={{ shrink: meal?.date }}
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
