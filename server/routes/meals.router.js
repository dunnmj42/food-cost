const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");


router.get("/", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const query = `
      SELECT * FROM "meals" WHERE "meals".user_id = ${req.user.id} 
      ORDER BY "meals".id DESC;
      `;
    pool
      .query(query)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});


router.post("/", rejectUnauthenticated, async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      console.log(req.body);
      const mealQuery = `
        INSERT INTO "meals" ("name", "description", "image", "date", "user_id", "portions")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING "id";
        `;

      const mealsResult = await pool.query(mealQuery, [
        req.body.meal.name,
        req.body.meal.description,
        req.body.meal.image,
        req.body.meal.date,
        req.user.id,
        req.body.meal.portions,
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
          newMealId
        ]);
        console.log(ingredientsResult)
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

router.put("/", rejectUnauthenticated, async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      console.log(req.body);
      const mealQuery = `
        UPDATE "meals" SET ("name", "description", "image", "date", "portions")
        = ($1, $2, $3, $4, $5)
        WHERE id = $6;
      `;

      const mealsResult = await pool.query(mealQuery, [
        req.body.meal.name,
        req.body.meal.description,
        req.body.meal.image,
        req.body.meal.date,
        req.body.meal.portions,
        req.body.meal.id,
      ]);

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

      const removeIngredientsQuery = `
        DELETE FROM "ingredients"
        WHERE id = $1;
      `;

      await req.body.ingredientsToRemove.forEach(async (ingredient) => {
        const removeIngredientsResult = await pool.query(removeIngredientsQuery, [
          ingredient.id
        ]);
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

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const idToRemove = req.params.id;
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
