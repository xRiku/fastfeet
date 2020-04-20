const { Router } = require('express');
const User = require('./app/models/User');
const SessionController = require('./app/controllers/SessionController')


const routes = new Router();

routes.post('/sessions', SessionController.store);

module.exports = routes;
