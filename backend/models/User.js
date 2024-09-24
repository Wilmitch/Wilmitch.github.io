class User {
    constructor(db) {
        this.db = db;
    }

    createUser(username, password, email, callback) {
        const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        this.db.query(sql, [username, password, email], callback);
    }

    findUserByUsername(username, callback) {
        const sql = 'SELECT * FROM users WHERE username = ?';
        this.db.query(sql, [username], callback);
    }
}

module.exports = User;
