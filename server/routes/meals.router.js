const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

/**
 * GET route template
 */
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

/**
 * POST route template
 */
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
          INSERT INTO "ingredients" ("name", "price")
          VALUES ($1, $2)
          RETURNING "id";
        `;

      const ingredientsArray = []

      req.body.ingredients.forEach(async (ingredient) => {
        ingredientsArray.push( ...(await pool.query(ingredientsQuery, [
          ingredient.name,
          ingredient.price,
        ])).rows);
        console.log(ingredientsArray.map(({id}) => id));
      });
      
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
