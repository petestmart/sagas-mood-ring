const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all data from tags table on DB
router.get('/', (req, res) => {
    let query = `SELECT * FROM "tags";`;
    pool.query(query)
    .then( result => {
        res.send(result.rows)
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
}) // end router.get

module.exports = router;