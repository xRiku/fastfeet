const Deliveryman = require('../models/Deliveryman');

class DeliverymanController {
  async store(req, res) {
    const deliveryman = await Deliveryman.create(req.body);
    return res.json(deliveryman);
  }

  async index(req, res) {
    return res.json({ status: 'ok' });
  }
}

module.exports = new DeliverymanController();
