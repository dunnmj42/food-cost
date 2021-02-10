const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
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
router.post('/', rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.body);
    const query = ``;
    pool
      .query(query, )
      .then((result) => {
        res.sendStatus(201);
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
