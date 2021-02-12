import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function MealEdit() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const details = useSelector((store) => store?.details);

  const blankIngredient = { name: "", price: "", ingredient_qty: "" };

  const [newIngredients, setNewIngredients] = useState([]);
  const [ingredientsToRemove, setIngredientsToRemove] = useState([]);

  const [ingredients, setIngredients] = useState(details[1]);
  const [meal, setMeal] = useState(details[0]);

  const addNewIngredient = () => {
    setNewIngredients([...newIngredients, { ...blankIngredient }]);
  };

  const removeIngredient = (i) => {
    const updatedIngredients = [...ingredients];
    const removalTarget = ingredients[i];
    setIngredientsToRemove([...ingredientsToRemove, removalTarget])
    updatedIngredients.splice(i, 1);
    setIngredients(updatedIngredients);
  };

  const ingredientChange = (e) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[e.target.dataset.i][e.target.dataset.property] = e.target.value;
    setIngredients(updatedIngredients);
  };

  const removeNewIngredient = (i) => {
    const updatedNewIngredients = [...newIngredients];
    updatedNewIngredients.splice(i, 1);
    setNewIngredients(updatedNewIngredients);
  };

  const newIngredientChange = (e) => {
    const updatedNewIngredients = [...newIngredients];
    updatedNewIngredients[e.target.dataset.i][e.target.dataset.property] = e.target.value;
    setNewIngredients(updatedNewIngredients);
  };

  const mealChange = (e) => {
    const newMeal = { ...meal };
    newMeal[e.target.name] = e.target.value;
    setMeal(newMeal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let editedMeal = {meal, ingredients, newIngredients, ingredientsToRemove}
    console.log(editedMeal);
    
    dispatch({ type: "EDIT_MEAL", payload: editedMeal });

  };

  return (
    <div>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        {ingredients?.map((ing, i) => {
          const nameId = `name-${i}`;
          const priceId = `price-${i}`;
          const qtyId = `qty-${i}`;
          return (
            <div key={i}>
              <TextField
                id={nameId}
                label="Ingredient"
                name={nameId}
                inputProps={{
                  "data-i" : `${i}`,
                  "data-property" : "name"
                }}
                value={ingredients[i].name}
                onChange={ingredientChange}
                variant="outlined"
              />
              <TextField
                id={priceId}
                label="Price"
                name={priceId}
                inputProps={{
                  "data-i" : `${i}`,
                  "data-property" : "price"
                }}
                value={ingredients[i].price}
                onChange={ingredientChange}
                variant="outlined"
              />
              <TextField
                id={qtyId}
                label="Quantity Used"
                name={qtyId}
                inputProps={{
                  "data-i" : `${i}`,
                  "data-property" : "ingredient_qty"
                }}
                value={ingredients[i].ingredient_qty}
                onChange={ingredientChange}
                variant="outlined"
              />
              <IconButton
                color="secondary"
                aria-label="remove ingredient"
                component="span"
                onClick={() => removeIngredient(i)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
        {newIngredients?.map((ing, i) => {
          const nameId = `name-${i}`;
          const priceId = `price-${i}`;
          const qtyId = `qty-${i}`;
          return (
            <div key={i}>
              <TextField
                id={nameId}
                label="Ingredient"
                name={nameId}
                inputProps={{
                  "data-i" : `${i}`,
                  "data-property" : "name"
                }}
                value={newIngredients[i].name}
                onChange={newIngredientChange}
                variant="outlined"
              />
              <TextField
                id={priceId}
                label="Price"
                name={priceId}
                inputProps={{
                  "data-i" : `${i}`,
                  "data-property" : "price"
                }}
                value={newIngredients[i].price}
                onChange={newIngredientChange}
                variant="outlined"
              />
              <TextField
                id={qtyId}
                label="Quantity Used"
                name={qtyId}
                inputProps={{
                  "data-i" : `${i}`,
                  "data-property" : "ingredient_qty"
                }}
                value={newIngredients[i].ingredient_qty}
                onChange={newIngredientChange}
                variant="outlined"
              />
              <IconButton
                color="secondary"
                aria-label="remove ingredient"
                component="span"
                onClick={() => removeNewIngredient(i)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
        <Fab variant="extended" color="primary" onClick={addNewIngredient}>
          <AddIcon className={classes.extendedIcon} />
          Add Ingredient
        </Fab>
        <div>
          <TextField
            id="name"
            name="name"
            label="Meal Name"
            value={meal?.name}
            onChange={mealChange}
            variant="outlined"
          />
          <TextField
            id="description"
            name="description"
            multiline
            rowsMax={4}
            label="Meal Description"
            value={meal?.description}
            onChange={mealChange}
            variant="outlined"
          />
          <TextField
            id="image"
            name="image"
            label="Meal Image URL"
            value={meal?.image}
            onChange={mealChange}
            variant="outlined"
          />
          <TextField
            id="portions"
            name="portions"
            label="Number of Portions"
            value={meal?.portions}
            onChange={mealChange}
            variant="outlined"
          />
          <TextField
            id="date"
            name="date"
            label="Date Made"
            value={meal?.date}
            onChange={mealChange}
            variant="outlined"
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default MealEdit;