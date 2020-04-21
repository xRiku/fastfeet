const { Router } = require('express');
const SessionController = require('./app/controllers/SessionController')
const RecipientController = require('./app/controllers/RecipientController')


const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/recipients', RecipientController.store);

module.exports = routes;
