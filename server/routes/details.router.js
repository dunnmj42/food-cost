const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get("/:id", (req, res) => {
  const idToGET = req.params.id;
  const query = `
    
    `;
  pool
    .query(query, [idToGET])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = router;