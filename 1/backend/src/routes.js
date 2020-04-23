const { Router } = require('express');
const SessionController = require('./app/controllers/SessionController')
const RecipientController = require('./app/controllers/RecipientController')
const authMiddlware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.use(authMiddlware);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

module.exports = routes;
