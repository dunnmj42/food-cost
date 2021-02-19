const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

router.get("/:id", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const idToGet = req.params.id;
    const mealQuery = `
    SELECT * FROM "meals" WHERE id = $1
    `;
    pool
      .query(mealQuery, [idToGet])
      .then((result) => {
        const meal = result.rows[0];
        const ingredientQuery = `
        SELECT * FROM "ingredients"
        WHERE meal_id = $1 ORDER BY id ASC;
      `;
        pool
          .query(ingredientQuery, [idToGet])
          .then((result) => {
            const ingredients = result.rows;
            const details = [meal, ingredients];
            if (meal.user_id === req.user.id) {
              res.send(details);
            }
          })
          .catch((error) => {
            console.error(error);
            res.sendStatus(500);
          });
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
