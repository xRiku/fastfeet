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

  async update(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    const updatedDeliveryman = await deliveryman.update(req.body);
    return res.json(updatedDeliveryman);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(400).json('User does not exist');
    }
    await deliveryman.destroy();
    return res.json('User was successfully deleted');
  }
}

module.exports = new DeliverymanController();
