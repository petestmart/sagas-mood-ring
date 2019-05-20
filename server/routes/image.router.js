const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all images from DB
router.get('/', (req, res) => {
    let query = `SELECT * FROM "images";`;
    pool.query(query)
        .then(result => {
            res.send(result.rows)
        }).catch(err => {
            console.log('Error in GET router /image:', err);
            res.sendStatus(500);
        })
}); // end router.get

// GET all data from junction table images_tags
router.get('/tags', (req, res) => {
    let query = `SELECT * FROM "images_tags";`;
    pool.query(query)
        .then(result => {
            res.send(result.rows)
        }).catch(err => {
            console.log('Error in GET router /image/tags:', err);
            res.sendStatus(500);
        })
});

// POST tags on images in junction table images_tags
router.post('/addtag', (req, res) => {
    const newTag = req.body;
    let query = `INSERT INTO "images_tags" ("images_id", "tags_id") VALUES ($1, $2);`;
    console.log('POST req.body:', req.body);
    pool.query(query, [newTag.images_id, newTag.tags_id])
        .then(() => {
            res.sendStatus(201)
        }).catch(err => {
            console.log('Error in POST router image/tags:', err);
            res.sendStatus(500);
        })
}) // end router.post

module.exports = router;