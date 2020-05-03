const { Router } = require('express');
const SessionController = require('./app/controllers/SessionController');
const RecipientController = require('./app/controllers/RecipientController');
const DeliverymanController = require('./app/controllers/DeliverymanController');

const authMiddlware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.use(authMiddlware);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/deliverymen', DeliverymanController.store);
routes.get('/deliverymen', DeliverymanController.index);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

module.exports = routes;
