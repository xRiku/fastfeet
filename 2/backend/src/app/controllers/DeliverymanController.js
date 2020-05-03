const Deliveryman = require('../models/Deliveryman');

class DeliverymanController {
  async index(req, res) {
    return res.json({ status: 'ok' });
  }
}

module.exports = new DeliverymanController();
