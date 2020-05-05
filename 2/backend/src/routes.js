const { Router } = require('express');
const multer = require('multer');

const SessionController = require('./app/controllers/SessionController');
const RecipientController = require('./app/controllers/RecipientController');
const DeliverymanController = require('./app/controllers/DeliverymanController');
const FileController = require('./app/controllers/FileController');

const authMiddlware = require('./app/middlewares/auth');

const multerConfig = require('./config/multer');

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.use(authMiddlware);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/deliverymen', DeliverymanController.store);
routes.get('/deliverymen', DeliverymanController.index);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;
