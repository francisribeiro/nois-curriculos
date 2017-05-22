const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const WrappedResponse = require('../models/wrappedResponse');
const database = require('../config/database');

const router = express.Router();

// Registrar
router.post('/register', (req, res, next) => {
    let newUser = new User(
        req.body.name,
        req.body.email,
        req.body.username,
        req.body.password,
        req.body.type
    );

    User.addUser(newUser, (err, user) => {
        if (err) res.json(WrappedResponse.generateResponse(400, 'error', 'Error at insert user!', null));
        else res.json(WrappedResponse.generateResponse(200, 'success', 'Insert User Successfully!', newUser));
    });
});


// Autenticação
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) res.json(WrappedResponse.generateResponse(400, 'error', 'Error at authenticate user!', null));
        if (!user.rows[0]) return res.json(WrappedResponse.generateResponse(400, 'error', 'Cannot find user!', null));
        User.comparePassword(password, user.rows[0].password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.rows[0], database.secret, {
                    expiresIn: 604800 // 1 semana
                });
                let data = {
                    token: `JWT ${token}`,
                    user: {
                        name: user.rows[0].nome,
                        username: user.rows[0].username,
                        email: user.rows[0].email
                    }
                };
                res.json(WrappedResponse.generateResponse(200, 'success', 'Authenticate User Successfully!', data))
            } else return res.json(WrappedResponse.generateResponse(400, 'error', 'Invalid Password!', null));
        });
    });
});

// Perfil
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json(WrappedResponse.generateResponse(200, 'success', 'Get Profile Successfully!', {
        user: req.user.rows[0]
    }));
});


// List All Users
router.get('/list/:type', function (req, res, next) {
    User.listAllUsers(req.params.type, function (err, result) {
        if (err) res.json(WrappedResponse.generateResponse(400, 'error', 'Error at list users!', null));
        else {
            let users = new Array();
            result.rows.forEach(function (u) {
                users.push(new User(
                    u.name,
                    u.email,
                    u.username,
                    u.password,
                    u.type
                ));
            });
            res.json(WrappedResponse.generateResponse(200, 'success', 'List Users Successfully!', users));
        }
    });
});

// Get user by Username
router.get('/u-s/:username', function (req, res, next) {
    User.getUserByUsername(req.params.username, function (err, result) {
        if (err) res.json(WrappedResponse.generateResponse(400, 'error', 'Error at get user by username!', null));
        else {
            let row = result.rows[0];
            let user = new User(
                row.name,
                row.email,
                row.username,
                row.password,
                row.type
            );
            res.json(WrappedResponse.generateResponse(200, 'success', 'Get User Successfully!', user));
        }
    });
});


// Update user
router.put('/', function (req, res, next) {
    let user = new User(
        req.body.name,
        req.body.email,
        req.body.username,
        req.body.password,
        req.body.type
    );

    User.updateUser(user, function (err, result) {
        if (err) res.json(WrappedResponse.generateResponse(400, 'error', 'Error at update user!', null));
        else res.json(WrappedResponse.generateResponse(200, 'success', 'Update User Successfully!', user));
    });
});

// Delete User
router.delete('/u/:username', function (req, res, next) {
    User.deleteUser(req.params.username, function (err, result) {
        if (err) res.json(WrappedResponse.generateResponse(400, 'error', 'Error at delete user!', null));
        else res.json(WrappedResponse.generateResponse(200, 'success', 'Delete User Successfully!', null));
    });
});







module.exports = router;