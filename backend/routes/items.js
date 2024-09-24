const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.post('/lost', (req, res) => {
        const { name, description } = req.body;
        const sql = 'INSERT INTO items (name, description, type) VALUES (?, ?, ?)';
        db.query(sql, [name, description, 'lost'], (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ id: result.insertId });
        });
    });

    router.post('/found', (req, res) => {
        const { name, description } = req.body;
        const sql = 'INSERT INTO items (name, description, type) VALUES (?, ?, ?)';
        db.query(sql, [name, description, 'found'], (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ id: result.insertId });
        });
    });

    router.get('/items', (req, res) => {
        const sql = 'SELECT * FROM items';
        db.query(sql, (err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    });

    router.get('/search', (req, res) => {
        const query = req.query.query;
        const sql = 'SELECT * FROM items WHERE name LIKE ? OR description LIKE ?';
        db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    });

    return router;
};
