require('dotenv').config(); // Load environment variables

const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const knex = require('knex');

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'lostnfound',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'lost_and_found'
});

// Knex configuration
const knexDb = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'lostnfound',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'lost_and_found'
    }
});

// Session store configuration
const store = new KnexSessionStore({
    knex: knexDb,
    tablename: 'sessions',
});

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

app.use(express.json());
app.use(express.static('client')); // Serve static files
app.use('/api', itemRoutes(db));
app.use('/api', userRoutes(db));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
