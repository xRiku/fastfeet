const Delivery = require("../models/Delivery");

class DeliveryController {
  async store(req, res) {
    return res.json({ status: 'ok' });
  }

  async index(req, res) {
    return res.json();
  }
};

module.exports = new DeliveryController();