const DeliveryProblem = require('../models/DeliveryProblem');

class DeliveryProblemController {
  async store(req, res) {
    return res.json({ message: 'ok' });
  }
}

module.exports = new DeliveryProblemController();
