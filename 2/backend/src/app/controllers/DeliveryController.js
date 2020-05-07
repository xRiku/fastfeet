const Delivery = require("../models/Delivery");

class DeliveryController {
  async store(req, res) {
    const order = await Delivery.create(req.body);
    return res.json(order);
  }

  async index(req, res) {
    return res.json();
  }
};

module.exports = new DeliveryController();