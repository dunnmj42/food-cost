const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

// GET all meals belonging to logged in user -- check authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const query = `
      SELECT * FROM "meals" WHERE "meals".user_id = ${req.user.id} 
      ORDER BY "meals".date DESC;
      `;
    pool
      .query(query)
      .then((result) => {
        res.send(result.rows); // send it bud
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// POST route -- handles add meal -- calculates CPM -- adds meal ingredients
router.post("/", rejectUnauthenticated, async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      let costPerMeal = 0; // CPM init

      req.body.ingredients.map((ingredient) => {
        return (costPerMeal +=
          (ingredient.price * ingredient.ingredient_qty) /
          req.body.meal.portions); // CPM logic to calculate for POST
      });

      const mealQuery = `
        INSERT INTO "meals" ("name", "description", "image", "date", "user_id", "portions", "cost_per_meal")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING "id";
        `; // QUERY RETURNS NEW MEAL PRIMARY KEY as ID

      const mealsResult = await pool.query(mealQuery, [
        req.body.meal.name,
        req.body.meal.description,
        req.body.meal.image,
        req.body.meal.date,
        req.user.id, // logged in, authenticated user
        req.body.meal.portions,
        costPerMeal, // CPM HERE
      ]);
      const newMealId = mealsResult?.rows[0].id;

      const ingredientsQuery = `
          INSERT INTO "ingredients" ("name", "price", "ingredient_qty", "meal_id")
          VALUES ($1, $2, $3, $4)
        `;

      await req.body.ingredients.forEach(async (ingredient) => {
        const ingredientsResult = await pool.query(ingredientsQuery, [
          ingredient.name,
          ingredient.price,
          ingredient.ingredient_qty,
          newMealId, // INSERT NEWLY RETURNED MEAL ID
        ]);
      });

      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

// "PUT" ROUTE(s) for edit view -- UPDATE "meals" then UPDATE "ingredients" then
// INSERT for new ingredients then DELETE for removed ingredients 
router.put("/", rejectUnauthenticated, async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      let costPerMeal = 0; // CPM INIT

      req.body.ingredients.map((ingredient) => {
        return (costPerMeal +=
          (ingredient.price * ingredient.ingredient_qty) /
          req.body.meal.portions); // calculate new CPM for updated meal
      });

      // UPDATE for meals
      const mealQuery = `
        UPDATE "meals" SET ("name", "description", "image", "date", "portions", "cost_per_meal")
        = ($1, $2, $3, $4, $5, $6)
        WHERE id = $7;
      `;

      const mealsResult = await pool.query(mealQuery, [
        req.body.meal.name,
        req.body.meal.description,
        req.body.meal.image,
        req.body.meal.date,
        req.body.meal.portions,
        costPerMeal, // NEW CPM
        req.body.meal.id,
      ]);

      // UPDATE for ingredients
      const ingredientsQuery = `
        UPDATE "ingredients" SET ("name", "price", "ingredient_qty")
        = ($1, $2, $3)
        WHERE id = $4;
      `;

      await req.body.ingredients.forEach(async (ingredient) => {
        const ingredientsResult = await pool.query(ingredientsQuery, [
          ingredient.name,
          ingredient.price,
          ingredient.ingredient_qty,
          ingredient.id,
        ]);
      });

      // INSERT for new ingredients
      const newIngredientsQuery = `
        INSERT INTO "ingredients" ("name", "price", "ingredient_qty", "meal_id")
        VALUES ($1, $2, $3, $4)
      `;

      await req.body.newIngredients.forEach(async (ingredient) => {
        const newIngredientsResult = await pool.query(newIngredientsQuery, [
          ingredient.name,
          ingredient.price,
          ingredient.ingredient_qty,
          req.body.meal.id,
        ]);
      });

      // DELETE for removed ingredients
      const removeIngredientsQuery = `
        DELETE FROM "ingredients"
        WHERE id = $1;
      `;

      await req.body.ingredientsToRemove.forEach(async (ingredient) => {
        const removeIngredientsResult = await pool.query(
          removeIngredientsQuery,
          [ingredient.id]
        );
      });

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

// DELETE for removing meal
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const idToRemove = req.params.id; // DELETE id target
    const removeQuery = `
      DELETE FROM "meals" 
      WHERE id = $1;
    `;
    pool
      .query(removeQuery, [idToRemove])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
