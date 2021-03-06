const bcrypt = require('bcryptjs');
const database = require('../config/database');

// Modelo de Usuário
var userSchema = function (name, email, username, password, type) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.type = type;
}

const User = module.exports = userSchema;

// Pega um usuário pelo Username
module.exports.getUserByUsername = (function (username, callback) {
    const query = database.query(`SELECT * FROM usuarios WHERE username = ($1)`, [username], callback);
});

// Faz a comparação dos passwords
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

// Add um usuário no banco
module.exports.addUser = (function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            database.query('INSERT INTO usuarios(name, email, username, password, type) values($1, $2, $3, $4, $5)', [newUser.name, newUser.email, newUser.username, newUser.password, newUser.type], callback);
        });
    });
});

// Count users
module.exports.countUsers = (function (callback) {
    database.query(
        'SELECT count(*) from usuarios',
        '',
        callback
    );
});

// Count users by Type
module.exports.countUsersByType = (function (type, callback) {
    database.query(
        'SELECT count(*) from usuarios where type = $1', [type],
        callback
    );
});

// List All Users
module.exports.listAllUsers = (function (type, callback) {
    database.query(
        'SELECT * from usuarios where type = $1', [type],
        callback
    );
});


// Update User
module.exports.updateUser = (function (user, callback) {
    database.query(
        'UPDATE usuarios set name = $1, email = $2 WHERE username = $3', [user.name, user.email, user.username],
        callback
    );
});

//Delete Users
module.exports.deleteUser = (function (username, callback) {
    database.query(
        'DELETE from usuarios where username = ($1)', [username],
        callback
    );
});