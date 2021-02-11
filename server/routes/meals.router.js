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
          ingredient.quantity,
          newMealId
        ]);
        console.log(ingredientsResult)
      });
      
      res.sendStatus(201)

    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
