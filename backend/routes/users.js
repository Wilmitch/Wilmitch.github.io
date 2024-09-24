const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

module.exports = (db) => {
    const userModel = new User(db);

    router.post('/register', async (req, res) => {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        userModel.createUser(username, hashedPassword, email, (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send('User registered successfully');
        });
    });

    router.post('/login', (req, res) => {
        const { username, password } = req.body;
        userModel.findUserByUsername(username, async (err, results) => {
            if (err || results.length === 0) return res.status(401).send('Invalid username or password');
            const user = results[0];
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                req.session.userId = user.id;
                res.send('Login successful');
            } else {
                res.status(401).send('Invalid username or password');
            }
        });
    });

    router.get('/logout', (req, res) => {
        req.session.destroy();
        res.send('Logged out successfully');
    });

    return router;
};
