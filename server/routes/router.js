const express = require('express');
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/controller');

//root route..method get..render.js file
route.get('/',services.homeRoutes)

route.get('/login-user',services.login)
route.get('/signup-user',services.signup)
route.get('/movie-user', (req, res) => {
    if (chk === 1) {
        // User is authenticated, render the movie-user page
        services.movie(req,res);
    } else {
        // User is not authenticated, redirect to login
        res.redirect('/login-user');
    }
});

//api 
route.post('/signup-user',controller.createUser)
route.post('/login-user',controller.createLogin)
route.get('/api/users',controller.find)
route.put('/api/users/:id',controller.update)
route.delete('/api/users/:id',controller.delete)

module.exports = route;