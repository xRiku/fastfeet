const Deliveryman = require('../models/Deliveryman');

class DeliverymanController {
  async store(req, res) {
    const deliveryman = await Deliveryman.create(req.body);
    return res.json(deliveryman);
  }

  async index(req, res) {
    const deliverymen = await Deliveryman.findAll();
    return res.json(deliverymen);
  }
}

module.exports = new DeliverymanController();
